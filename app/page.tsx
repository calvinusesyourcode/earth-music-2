'use client';

import Link from "next/link"
import Image from "next/image";
import Head from "next/head";
import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useContext, useEffect, useRef, useState } from "react";
import MinecraftPlayer from "@/components/minecraft-player";

export default function IndexPage() {

  return (
    <>
      <section className= "flex h-screen items-end p-10 gap-1">
        <div className="mx-auto flex items-end gap-2">
          <MinecraftPlayer />
        </div>
      </section>
    </>
)}
