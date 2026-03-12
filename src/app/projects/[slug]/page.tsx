import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectsData } from "@/lib/projects-data";
import { ProjectDetailsContent } from "./ProjectDetailsContent";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const study = projectsData.find(p => p.slug === params.slug);
  
  if (!study) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${study.title} | Case Study`,
    description: study.description,
    openGraph: {
      title: `${study.title} | Software Excellence by Sofol IT`,
      description: study.description,
      images: [
        {
          url: study.imageUrl,
          width: 1200,
          height: 630,
          alt: study.title,
        },
      ],
    },
  };
}

export default function ProjectPage({ params }: PageProps) {
  const study = projectsData.find(p => p.slug === params.slug);

  if (!study) {
    notFound();
  }

  return <ProjectDetailsContent study={study} />;
}
