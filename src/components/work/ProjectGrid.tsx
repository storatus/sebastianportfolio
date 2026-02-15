"use client";

import { useState } from "react";
import {
  Column,
  Heading,
  Row,
  Button,
  RevealFx,
  Dialog,
  Text,
  Tag,
} from "@once-ui-system/core";
import { projects, Project } from "@/lib/projects";
import Image from "next/image";

const SimpleProjectCard = ({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) => (
  <Column
    fillWidth
    padding="l"
    gap="m"
    background="neutral-alpha-weak"
    radius="l"
    style={{
      cursor: "pointer",
      border: "1px solid var(--neutral-border-weak)",
    }}
    onClick={onClick}
  >
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "200px",
        borderRadius: "var(--radius-m)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "var(--neutral-surface-strong)",
        }}
      />
      {project.image && (
        <Image
          src={project.image}
          alt={project.title}
          fill
          style={{ objectFit: "cover" }}
        />
      )}
    </div>
    <Heading variant="heading-strong-s">{project.title}</Heading>
    <Text variant="body-default-s" onBackground="neutral-medium">
      {project.description}
    </Text>
    <Row gap="xs" wrap>
      {project.tags.slice(0, 3).map((tag: string) => (
        <Tag key={tag} variant="brand" size="s">
          {tag}
        </Tag>
      ))}
    </Row>
  </Column>
);

export const ProjectGrid = () => {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const allTags = [
    "All",
    ...Array.from(new Set(projects.flatMap((p: Project) => p.tags))),
  ];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p: Project) => p.tags.includes(filter));

  return (
    <Column fillWidth gap="xl" paddingY="32" id="work">
      <RevealFx translateY="4">
        <Heading variant="display-strong-s">Projects</Heading>
      </RevealFx>

      <RevealFx translateY="4" delay={0.1}>
        <Row gap="s" wrap paddingBottom="l">
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={filter === tag ? "primary" : "tertiary"}
              size="s"
              onClick={() => setFilter(tag)}
            >
              {tag}
            </Button>
          ))}
        </Row>
      </RevealFx>

      <Row fillWidth gap="l" wrap>
        {filteredProjects.map((project, index) => (
          <Column
            key={project.title}
            fillWidth
            s={{ width: "100%" }}
            m={{ width: "48%" }}
            l={{ width: "31%" }}
          >
            <RevealFx translateY="8" delay={index * 0.1} fillWidth>
              <SimpleProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </RevealFx>
          </Column>
        ))}
      </Row>

      <Dialog
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ""}
        style={{ maxWidth: "800px" }}
      >
        {selectedProject && (
          <Column gap="l">
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "300px",
                borderRadius: "var(--radius-l)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "var(--neutral-surface-strong)",
                }}
              />
              {selectedProject.image && (
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>
            <Text variant="body-default-l" onBackground="neutral-strong">
              {selectedProject.description}
            </Text>

            <Column gap="s">
              <Text variant="heading-strong-xs">Technologies</Text>
              <Row gap="s" wrap>
                {selectedProject.tags.map((tag: string) => (
                  <Tag key={tag} variant="brand" size="s">
                    {tag}
                  </Tag>
                ))}
              </Row>
            </Column>

            <Row gap="m" paddingTop="m">
              {selectedProject.link && (
                <Button href={selectedProject.link} variant="primary" arrowIcon>
                  Live Demo
                </Button>
              )}
              {selectedProject.github && (
                <Button
                  href={selectedProject.github}
                  variant="secondary"
                  prefixIcon="github"
                >
                  View Code
                </Button>
              )}
            </Row>
          </Column>
        )}
      </Dialog>
    </Column>
  );
};
