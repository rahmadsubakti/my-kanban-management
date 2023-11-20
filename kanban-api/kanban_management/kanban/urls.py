from kanban import views
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('boards/', views.BoardList.as_view(), name='board-list'),
    path('board/create', views.BoardCreate.as_view(), name='board-create'),
    path('board/<str:id>', views.BoardDetail.as_view(), name='board-detail'),
    path('column/create', views.ColumnCreate.as_view(), name='column-create'),
    path('column/<str:id>', views.ColumnDetail.as_view(), name='column-detail'),
    path('task/create', views.TaskCreate.as_view(), name='task-create'),
    path('task/<str:id>', views.TaskDetail.as_view(), name='task-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)