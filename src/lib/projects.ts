export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image: string;
}

export const projects: Project[] = [
  {
    title: "E-commerce Platform",
    description:
      "A full-featured online store built with Next.js, Stripe, and Tailwind CSS. User-friendly interface with rigorous state management.",
    tags: ["Next.js", "TypeScript", "Stripe", "Tailwind"],
    link: "https://example.com/ecommerce",
    github: "https://github.com/example/ecommerce",
    image: "/images/project-ecommerce.jpg",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task manager with real-time updates using Socket.io and a Node.js backend.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    link: "https://example.com/task-app",
    github: "https://github.com/example/task-app",
    image: "/images/project-task.jpg",
  },
  {
    title: "Portfolio Website",
    description:
      "My personal portfolio showcasing my projects and skills, featuring smooth animations and a responsive design.",
    tags: ["Next.js", "Framer Motion", "SCSS"],
    link: "https://example.com",
    github: "https://github.com/example/portfolio",
    image: "/images/project-portfolio.jpg",
  },
];
