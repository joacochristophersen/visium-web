import type { ReactNode } from "react";

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface TechPillar {
  id: string;
  name: string;
  headline: string;
  description: string;
  metric: string;
  metricLabel: string;
}

export interface Industry {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface Step {
  index: string;
  title: string;
  description: string;
}

export interface SectionProps {
  id?: string;
  className?: string;
  children?: ReactNode;
}
