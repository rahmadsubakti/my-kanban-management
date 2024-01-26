from rest_framework.response import Response
from rest_framework import status
import uuid

class SubCreateMixin:
    main_model = None
    sub_serializer_class = None
    main_rel_field = None
    sub_field = None

    def create(self, request, *args, **kwargs):
        data = request.data

        try:
            sub_data = data.pop(self.sub_field)
        except KeyError:
            sub_data = None
        
        if self.main_model:
            if hasattr(self.main_model, 'user'):
                data['user'] = request.user.pk

        main_serializer = self.get_serializer(data=data)
        main_serializer.is_valid(raise_exception=True)
        self.perform_create(main_serializer)
        
        if sub_data:
            main_id = main_serializer.data.get('id')
            for i in range(len(sub_data)):
                sub_data[i][self.main_rel_field] = main_id
            
            sub_serializer = self.sub_serializer_class(data=sub_data, many=True)
            sub_serializer.is_valid(raise_exception=True)
            self.perform_subcreate(sub_serializer)
            
        return Response(main_serializer.data, status=status.HTTP_201_CREATED)
    
    def perform_create(self, serializer):
        serializer.save()

    def perform_subcreate(self, serializer):
        serializer.save()

class SubUpdateMixin:
    main_model = None
    sub_model = None
    sub_serializer_class = None
    main_rel_field = None
    sub_field = None

    def update(self, request, *args, **kwargs):
        data = request.data
        try:
            subs_data = data.pop(self.sub_field)

        except KeyError:
            subs_data = None

        data['user'] = request.user.pk

        main_instance = self.get_object()
        main_serializer = self.get_serializer(main_instance, data=data)

        main_serializer.is_valid(raise_exception=True)
        self.perform_update(main_serializer)

        if subs_data:
            main_id = main_serializer.data.get('id')
            #sub_queryset = self.sub_model.objects.all()
            filter_kwargs = {self.main_rel_field: main_instance}
            sub_queryset = self.sub_model.objects.filter(**filter_kwargs)
            sub_queryset_mapping = {sub.id: sub for sub in sub_queryset}
            sub_data_mapping = {}
            for i in range(len(subs_data)):
                sub_data_id = subs_data[i].get('id', None)
                if sub_data_id is None:
                    sub_data_mapping[f'sub{i}'] = subs_data[i]
                else:
                    sub_data_id = uuid.UUID(sub_data_id)
                    sub_data_mapping[sub_data_id] = subs_data[i]

            # Perform creations and updates
            for sub_id, sub_data in sub_data_mapping.items():
                instance = sub_queryset_mapping.get(sub_id, None)
                if instance:
                    sub_serializer = self.sub_serializer_class(instance, data=sub_data)
                else:
                    sub_data[self.main_rel_field] = main_id
                    sub_serializer = self.sub_serializer_class(data=sub_data)

                sub_serializer.is_valid(raise_exception=True)
                self.perform_subupdate(sub_serializer)

            # perform deletions
            for sub_id, data in sub_queryset_mapping.items():
                if sub_id not in sub_data_mapping:
                    data.delete()

        return Response(main_serializer.data, status=status.HTTP_200_OK)

    def perform_update(self, serializer):
        serializer.save()

    def perform_subupdate(self, serializer):
        serializer.save()