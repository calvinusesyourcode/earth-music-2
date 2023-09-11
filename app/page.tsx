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
import { useContext, useEffect, useState } from "react";

function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function IndexPage() {
  const [audio1, setAudio1] = useState<any>(null);
  let [artist, setArtist] = useState("C418");
  let [track, setTrack] = useState("Cat");
  let [art, setArt] = useState("/volume-alpha.png")
  let [queue, setQueue] = useState<string[]>([]);

  const world1: string[] = ["music/world1/C418 - Beginning.mp3", "music/world1/C418 - Blocks.mp3", "music/world1/C418 - Cat.mp3", "music/world1/C418 - Chirp.mp3", "music/world1/C418 - Chris.mp3", "music/world1/C418 - Clark.mp3", "music/world1/C418 - Danny.mp3", "music/world1/C418 - Dog.mp3", "music/world1/C418 - Droopy Likes Ricochet.mp3", "music/world1/C418 - Droopy Likes Your Face.mp3", "music/world1/C418 - Dry Hands.mp3", "music/world1/C418 - Excuse.mp3", "music/world1/C418 - Haggstrom.mp3", "music/world1/C418 - Key.mp3", "music/world1/C418 - Kyoto.mp3", "music/world1/C418 - Living Mice.mp3", "music/world1/C418 - Mall.mp3", "music/world1/C418 - Mellohi.mp3", "music/world1/C418 - Mice on Venus.mp3", "music/world1/C418 - Minecraft.mp3", "music/world1/C418 - Moog City.mp3", "music/world1/C418 - Oxygene.mp3", "music/world1/C418 - Stal.mp3", "music/world1/C418 - Strad.mp3", "music/world1/C418 - Subwoofer Lullaby.mp3", "music/world1/C418 - Sweden.mp3", "music/world1/C418 - Wait.mp3", "music/world1/C418 - Ward.mp3", "music/world1/C418 - Wet Hands.mp3", "music/world1/C418 - Equinoxe.mp3"]
  const world2: string[] = ["music/world2/C418 - Alpha.mp3", "music/world2/C418 - Aria Math.mp3", "music/world2/C418 - Ballad of the Cats.mp3", "music/world2/C418 - Beginning 2.mp3", "music/world2/C418 - Biome Fest.mp3", "music/world2/C418 - Blind Spots.mp3", "music/world2/C418 - Dead Voxel.mp3", "music/world2/C418 - Door.mp3", "music/world2/C418 - Eleven.mp3", "music/world2/C418 - Far.mp3", "music/world2/C418 - Flake.mp3", "music/world2/C418 - Floating Trees.mp3", "music/world2/C418 - Haunt Muskie.mp3", "music/world2/C418 - Moog City 2.mp3", "music/world2/C418 - Mutation.mp3", "music/world2/C418 - Taswell.mp3"]
  const world3: string[] = ["music/world3/C418 - Concrete Halls.mp3", "music/world3/C418 - Dragon Fish.mp3", "music/world3/C418 - Dreiton.mp3", "music/world3/C418 - Intro.mp3", "music/world3/C418 - Ki.mp3", "music/world3/C418 - Warmth.mp3", "music/world3/Lena Raine - Rubedo.mp3"]
  
  
  useEffect(() => {
    setQueue([...shuffleArray(world1), ...shuffleArray(world2), ...shuffleArray(world3)])
    const audio = new Audio('music/world1/C418 - Cat.mp3');
    audio.addEventListener('ended', playNext);
    setAudio1(audio);
  }, [])

  const playNext = () => {
    if (queue.length == 0) {
      setQueue([...shuffleArray(world1), ...shuffleArray(world2), ...shuffleArray(world3)]);
    }
    const nextUp = queue.shift();
    if (nextUp) {
      audio1.pause();
      audio1.src = nextUp;
      let nice_title = nextUp.split("/")[2].split(".")[0];
      let title = nice_title.split(" - ")[1];
      let composer = nice_title.split(" - ")[0];
      setArtist(composer);
      setTrack(title);
      audio1.title = title;
      if (nextUp.includes("world1")) {
        setArt("/volume-alpha.png")
      } else {
        if (nextUp.includes("world2")) {
          setArt("/volume-beta.jpg")
        } else {
          setArt("/dragon-fish.jpg")
        }
      }
    }
    audio1.play();
  }

  return (
    <>
    <section className= "flex h-screen items-end p-4">
    <Card onClick={() => {playNext()}} className="mx-auto w-60">
      <CardHeader className="flex gap-3">
        <Image src={art} alt="album art" height={50} width={50} className="object-contain"/>
        <div>
          <CardTitle>{track}</CardTitle>
          <CardDescription>{artist}</CardDescription>
        </div>
      </CardHeader>
    </Card>

  </section>
  </>
)}
