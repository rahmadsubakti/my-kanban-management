const createId = () => Math.random().toString();

const dummyData = {
  id: createId(),
  name: "Platform Launch",
  columns: [
    {
      id: createId(),
      name: "Todo",
      tasks: [
        {
          id: createId(),
          title: "Build UI for onboarding flow",
          description: "oiejdoiwejfjwefj",

          subtasks: [
            {
              id: createId(),
              title: "Sign up page",
              isDone: true,
            },
            {
              id: createId(),
              title: "Sign in page",
              isDone: false,
            },
            {
              id: createId(),
              title: "Welcome page",
              isDone: false,
            },
          ],
        },
        {
          id: createId(),
          title: "Build UI for search",
          description: "",

          subtasks: [
            {
              id: createId(),
              title: "Search page",
              isDone: false,
            },
          ],
        },
        {
          id: createId(),
          title: "Build settings UI",
          description: "",

          subtasks: [
            {
              title: "Account page",
              isDone: false,
            },
            {
              title: "Billing page",
              isDone: false,
            },
          ],
        },
        {
          id: createId(),
          title: "QA and test all major user journeys",
          description:
            "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",

          subtasks: [
            {
              id: createId(),
              title: "Internal testing",
              isDone: false,
            },
            {
              id: createId(),
              title: "External testing",
              isDone: false,
            },
          ],
        },
      ],
    },
    {
      id: createId(),
      name: "Doing",
      tasks: [
        {
          id: createId(),
          title: "Design settings and search pages",
          description: "",

          subtasks: [
            {
              id: createId(),
              title: "Settings - Account page",
              isDone: true,
            },
            {
              id: createId(),
              title: "Settings - Billing page",
              isDone: true,
            },
            {
              id: createId(),
              title: "Search page",
              isDone: false,
            },
          ],
        },
        {
          id: createId(),
          title: "Add account management endpoints",
          description: "",

          subtasks: [
            {
              id: createId(),
              title: "Upgrade plan",
              isDone: true,
            },
            {
              id: createId(),
              title: "Cancel plan",
              isDone: true,
            },
            {
              id: createId(),
              title: "Update payment method",
              isDone: false,
            },
          ],
        },
        {
          id: createId(),
          title: "Design onboarding flow",
          description: "",

          subtasks: [
            {
              id: createId(),
              title: "Sign up page",
              isDone: true,
            },
            {
              id: createId(),
              title: "Sign in page",
              isDone: false,
            },
            {
              id: createId(),
              title: "Welcome page",
              isDone: false,
            },
          ],
        },
        {
          id: createId(),
          title: "Add search enpoints",
          description: "",

          subtasks: [
            {
              id: createId(),
              title: "Add search endpoint",
              isDone: true,
            },
            {
              id: createId(),
              title: "Define search filters",
              isDone: false,
            },
          ],
        },
        {
          id: createId(),
          title: "Add authentication endpoints",
          description: "",

          subtasks: [
            {
              id: createId(),
              title: "Define user model",
              isDone: true,
            },
            {
              id: createId(),
              title: "Add auth endpoints",
              isDone: false,
            },
          ],
        },
        {
          id: createId(),
          title:
            "Research pricing points of various competitors and trial different business models",
          description:
            "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",

          subtasks: [
            {
              id: createId(),
              title: "Research competitor pricing and business models",
              isDone: true,
            },
            {
              id: createId(),
              title: "Outline a business model that works for our solution",
              isDone: false,
            },
            {
              id: createId(),
              title:
                "Talk to potential customers about our proposed solution and ask for fair price expectancy",
              isDone: false,
            },
          ],
        },
      ],
    },
    {
      id: createId(),
      name: "Done",
      tasks: [
        {
          id: createId(),
          title: "Conduct 5 wireframe tests",
          description:
            "Ensure the layout continues to make sense and we have strong buy-in from potential users.",

          subtasks: [
            {
              id: createId(),
              title: "Complete 5 wireframe prototype tests",
              isDone: true,
            },
          ],
        },
        {
          id: createId(),
          title: "Create wireframe prototype",
          description:
            "Create a greyscale clickable wireframe prototype to test our asssumptions so far.",

          subtasks: [
            {
              id: createId(),
              title: "Create clickable wireframe prototype in Balsamiq",
              isDone: true,
            },
          ],
        },
        {
          id: createId(),
          title: "Review results of usability tests and iterate",
          description:
            "Keep iterating through the subtasks until we're clear on the core concepts for the app.",

          subtasks: [
            {
              id: createId(),
              title:
                "Meet to review notes from previous tests and plan changes",
              isDone: true,
            },
            {
              id: createId(),
              title: "Make changes to paper prototypes",
              isDone: true,
            },
            {
              id: createId(),
              title: "Conduct 5 usability tests",
              isDone: true,
            },
          ],
        },
        {
          id: createId(),
          title:
            "Create paper prototypes and conduct 10 usability tests with potential customers",
          description: "",

          subtasks: [
            {
              id: createId(),
              title: "Create paper prototypes for version one",
              isDone: true,
            },
            {
              id: createId(),
              title: "Complete 10 usability tests",
              isDone: true,
            },
          ],
        },
        {
          id: createId(),
          title: "Market discovery",
          description:
            "We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.",

          subtasks: [
            {
              id: createId(),
              title: "Interview 10 prospective customers",
              isDone: true,
            },
          ],
        },
        {
          id: createId(),
          title: "Competitor analysis",
          description: "",

          subtasks: [
            {
              id: createId(),
              title: "Find direct and indirect competitors",
              isDone: true,
            },
            {
              id: createId(),
              title: "SWOT analysis for each competitor",
              isDone: true,
            },
          ],
        },
        {
          id: createId(),
          title: "Research the market",
          description:
            "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",

          subtasks: [
            {
              id: createId(),
              title: "Write up research analysis",
              isDone: true,
            },
            {
              id: createId(),
              title: "Calculate TAM",
              isDone: true,
            },
          ],
        },
      ],
    },
  ],
};

export default dummyData;