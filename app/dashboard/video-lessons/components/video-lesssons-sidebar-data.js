import image01 from "@/public/assets/video-lessons/s_image01.png";
import image02 from "@/public/assets/video-lessons/s_image02.png";
import image03 from "@/public/assets/video-lessons/s_image03.png";

export const videoLessonsSidebarData = [
  {
    id: 1,
    title: "Critical Thinking Skills",
    slug: "critical-thinking-skills",
    iconImage: image01,
    topics: 6,
    completedTopics: 6,
    progress: 6,
    videosList: [
      {
        id: 1,
        title: "Critical Thinking Skills",
        description: "New Descriptions",
        slug: "critical-thinking-skills",
        videoThumbnail: image01,
        duration: "25:00",
        tags: ["Critical Thinking", "Logic", "Reasoning"],
      },
      {
        id: 2,
        title: "Critical Thinking Skills",
        description: "New Descriptions",
        slug: "critical-thinking-skills",
        videoThumbnail: image01,
        duration: "25:00",
        tags: ["Critical Thinking", "Logic", "Reasoning"],
      },
      {
        id: 3,
        title: "Critical Thinking Skills",
        description: "New Descriptions",
        slug: "critical-thinking-skills",
        videoThumbnail: image01,
        duration: "25:00",
        tags: ["Critical Thinking", "Logic", "Reasoning"],
      },
    ],
  },
  {
    id: 2,
    title: "Safety and Infection Control",
    slug: "safety-and-infection-control",
    iconImage: image02,
    topics: 6,
    completedTopics: 0,
    progress: 0,
    videosList: [],
  },
  {
    id: 3,
    title: "Health Promotion and Maintenance",
    slug: "health-promotion-and-maintenance",
    iconImage: image03,
    topics: 6,
    completedTopics: 0,
    progress: 0,
    videosList: [],
  },
];

export default videoLessonsSidebarData;
