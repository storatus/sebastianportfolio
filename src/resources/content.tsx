import {
  About,
  Blog,
  Gallery,
  Home,
  Newsletter,
  Person,
  Social,
  Work,
} from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Sebastian",
  lastName: "Glahn",
  name: `Sebastian Glahn`,
  role: "Senior Full-Stack Engineer",
  avatar: "/images/avatarSebastian.jpg",
  email: "sebastian.glahn89@web.de",
  location: "America/La_Paz", // Santa Cruz, Bolivia
  languages: ["English (Fluent)", "Spanish (Fluent)", "German (Fluent)"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My thoughts on AI, software engineering, and business</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/storatus",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/sebastian-glahn/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Senior Full-Stack Engineer specializing in AI Applications</>,
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured Work</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
      </Row>
    ),
    href: "/work/aihoo",
  },
  subline: (
    <>
      I have been developing for 14 years and currently specialize in{" "}
      <Text as="span" size="xl" weight="strong">
        AI applications
      </Text>{" "}
      and the{" "}
      <Text as="span" size="xl" weight="strong">
        Vercel AI SDK
      </Text>
      .
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/sebastian-glahn",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I have been developing for 14 years, and I love my craft. During my
        career, I have worked in different international settings and on diverse
        projects. My business background enables me to have a unique perspective
        on programming, tackling problems in a creative and structured way,
        always keeping added value in mind. I adhere to proven coding standards,
        and I currently specialize in AI applications and the Vercel AI SDK.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Aihoo",
        timeframe: "2023 - Present",
        role: "Development Lead",
        achievements: [
          <>
            Developed an innovative AI web platform for simultaneous interaction
            with multiple AI chatbots, enhancing comparative analysis and
            response optimization.
          </>,
          <>
            Implemented a Meta Chat AI feature to refine chatbot outputs and
            identify top-performing models, improving overall user experience.
          </>,
          <>
            Aihoo is currently part of Acceleratec, a leading start-up
            accelerator program in Bolivia.
          </>,
          <>
            Visit the platform at{" "}
            <a
              href="https://www.aihoo.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium underline-offset-4"
            >
              www.aihoo.ai
            </a>
          </>,
          <>
            Tech stack: Next.js, Vercel AI SDK, Tailwind CSS, and PostgreSQL.
          </>,
        ],
        images: [],
      },
      {
        company: "Freelance",
        timeframe: "2015 - Present",
        role: "Full-Stack Developer",
        achievements: [
          <>
            Worked on various projects as a front-end and full-stack developer.
          </>,
          <>
            Favorite tech stack: Next.js, Vercel AI SDK, Node.js, and React
            Native.
          </>,
        ],
        images: [],
      },
      {
        company: "LevelApp",
        timeframe: "2019 - 2022",
        role: "Mobile Development Lead",
        achievements: [
          <>
            Developed and published a complete video game marketplace for the
            German market (iOS/Android), achieving 1,079 registered users
            shortly after launch.
          </>,
          <>
            Integrated social networking features with marketplace
            functionality, allow gamers to chat, follow profiles, and discuss
            games in real-time.
          </>,
          <>
            Achieved subscription conversion rates of 18%-27.5%, placing the
            platform's performance in the top 5% of the industry.
          </>,
          <>
            Implemented advanced search with international geolocation and a
            database of over 300,000 games and consoles.
          </>,
        ],
        images: [],
      },
      {
        company: "OSB AG",
        timeframe: "2019 - 2020",
        role: "Frontend Developer",
        achievements: [
          <>
            Developed React Native Apps for the German public broadcasting
            company "WDR" in Cologne, Germany.
          </>,
          <>
            Developed a white-label iOS/Android App for different local
            broadcasters and radio stations.
          </>,
        ],
        images: [],
      },
      {
        company: "Zupa S.R.L",
        timeframe: "2017 - 2018",
        role: "Development Lead and Co-founder",
        achievements: [
          <>Developed a delivery App for the Bolivian market.</>,
          <>
            Responsibilities included product development, development of the
            hybrid mobile app, and an administration system.
          </>,
        ],
        images: [],
      },
      {
        company: "Prometheus Technology S.R.L",
        timeframe: "2015 - 2018",
        role: "COO and Co-Founder",
        achievements: [
          <>
            Led an outsourcing company that offered high-quality web programming
            for clients worldwide, with a focus on Germany and Spain.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "University of Bath, UK",
        description: <>M.Sc. Computer Science (2017 - 2018)</>,
      },
      {
        name: "Munich Business School",
        description: <>B.A. International Business (2009 - 2013)</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Skills",
    skills: [
      {
        title: "Project Management",
        description: (
          <>
            Experienced in leading teams and managing complex software projects
            from conception to delivery.
          </>
        ),
      },
      {
        title: "AI Tools & SDKs",
        description: (
          <>
            Specialized in Vercel AI SDK, OpenAI, and integrating various LLMs
            into production applications.
          </>
        ),
      },
      {
        title: "Agile Development",
        description: (
          <>
            Strong proponent of Agile methodologies, ensuring iterative delivery
            and high-quality code.
          </>
        ),
      },
      {
        title: "SEO",
        description: (
          <>
            Implementing best practices for search engine optimization in modern
            web applications.
          </>
        ),
      },
    ],
  },
  lecturing: {
    display: true,
    title: "Lecturing",
    items: [
      {
        title: "Google Dev Speaker",
        timeframe: "2024",
        role: "Google Dev Event",
        description: (
          <>
            Presented Aihoo at the Google Dev event in Santa Cruz de la Sierra.
          </>
        ),
      },
      {
        title: "Mobile App Development Lecturer",
        timeframe: "2023",
        role: "Chicas Programadoras",
        description: (
          <>
            Participated as a Mobile App lecturer in the “Chicas Programadoras”
            program, an NGO that teaches talented young girls programming and
            tech skills in Bolivia.
          </>
        ),
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
