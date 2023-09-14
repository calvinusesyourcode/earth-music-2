'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function MinecraftPlayer() {
  let [artist, setArtist] = useState("C418");
  let [track, setTrack] = useState("Wet Hands");
  let [world, setWorld] = useState(1);
  let [art, setArt] = useState("/volume-alpha.png");
  let [queue, setQueue] = useState<string[]>([]);
  let [next, setNext] = useState<string>("world1/C418 - Wet Hands.mp3")
  let [quality, setQuality] = useState<string>("decent")
  let [songNumber, setSongNumber] = useState<number>(1)
  let [buttonClicks, setButtonClicks] = useState<number>(0)
  
  const world1: string[] = ["world1/C418 - Beginning.mp3", "world1/C418 - Blocks.mp3", "world1/C418 - Cat.mp3", "world1/C418 - Chirp.mp3", "world1/C418 - Chris.mp3", "world1/C418 - Clark.mp3", "world1/C418 - Danny.mp3", "world1/C418 - Dog.mp3", "world1/C418 - Droopy Likes Ricochet.mp3", "world1/C418 - Droopy Likes Your Face.mp3", "world1/C418 - Dry Hands.mp3", "world1/C418 - Excuse.mp3", "world1/C418 - Haggstrom.mp3", "world1/C418 - Key.mp3", "world1/C418 - Kyoto.mp3", "world1/C418 - Living Mice.mp3", "world1/C418 - Mall.mp3", "world1/C418 - Mellohi.mp3", "world1/C418 - Mice on Venus.mp3", "world1/C418 - Minecraft.mp3", "world1/C418 - Moog City.mp3", "world1/C418 - Oxygene.mp3", "world1/C418 - Stal.mp3", "world1/C418 - Strad.mp3", "world1/C418 - Subwoofer Lullaby.mp3", "world1/C418 - Sweden.mp3", "world1/C418 - Wait.mp3", "world1/C418 - Ward.mp3", "world1/C418 - Wet Hands.mp3", "world1/C418 - Equinoxe.mp3"]
  const world2: string[] = ["world2/C418 - Alpha.mp3", "world2/C418 - Aria Math.mp3", "world2/C418 - Ballad of the Cats.mp3", "world2/C418 - Beginning 2.mp3", "world2/C418 - Biome Fest.mp3", "world2/C418 - Blind Spots.mp3", "world2/C418 - Dead Voxel.mp3", "world2/C418 - Door.mp3", "world2/C418 - Eleven.mp3", "world2/C418 - Far.mp3", "world2/C418 - Flake.mp3", "world2/C418 - Floating Trees.mp3", "world2/C418 - Haunt Muskie.mp3", "world2/C418 - Moog City 2.mp3", "world2/C418 - Mutation.mp3", "world2/C418 - Taswell.mp3"]
  const world3: string[] = ["world3/C418 - Concrete Halls.mp3", "world3/C418 - Dragon Fish.mp3", "world3/C418 - Dreiton.mp3", "world3/C418 - Intro.mp3", "world3/C418 - Ki.mp3", "world3/C418 - Warmth.mp3", "world3/Lena Raine - Rubedo.mp3"]
  
  const shuffleArray = (array: any) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }
  
  const audio1 = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audio1.current = new Audio('music/decent/world1/C418 - Wet Hands.mp3');
    
    setQueue([...shuffleArray(world1),...shuffleArray(world2),...shuffleArray(world3)])
  }, []);


  const handleMetadeta = (songPath: string) => {
    const [folder, quality, world, artistAndTrack] = songPath.split("/")
    let [artistName, trackName] = artistAndTrack.split(" - ")
    trackName = trackName.split(".")[0]
    setArtist(artistName); setTrack(trackName); setWorld(parseInt(( (world.match(/\d+/) || ["1"]) [0])))
    setArt(world == "world1" ? "/volume-alpha.png" : world == "world2" ? "/volume-beta.jpg" : "/dragon-fish.jpg")
    if (audio1.current) { audio1.current.title = world }
  }
  const playNext = () => {
    const songIndex = (songNumber % queue.length) - 1
    const song = queue[songIndex]
    setSongNumber(songNumber => songNumber + 1)
    const songPath = "music/" + quality + "/" + song
    console.log({queue: queue, song: queue[songIndex], songIndex: songIndex})
    console.log(songPath)
    if (song && audio1.current) {
      audio1.current.src = songPath;
      audio1.current.play();
      handleMetadeta(songPath)

    }
  }

  return (
    <>
      <Card onClick={() => {
        playNext();
        if (audio1.current && buttonClicks == 0) {
        audio1.current.addEventListener('ended', playNext);
        setButtonClicks(buttonClicks => buttonClicks + 1)
      }}}>
        <CardHeader className="flex gap-3">
            <Image src={art} alt="album art" height={50} width={50} className="object-contain"/>
            <div>
            <CardTitle>World {world}</CardTitle>
            <CardDescription>{artist}, {track}</CardDescription>
            </div>
        </CardHeader>
      </Card>
    </>
)}
