import React from "react";

export default function Home() {
  return (
    <div className="container mx-auto lg:relative bg-blue-500 min-h-screen flex flex-col shadow-custom1 rounded-[10px]">
      <div className="wrapper">
        <div className="boxh box1">
          <div className="nested">a</div>
        </div>
        <div className="boxr">
          <div className="boxh box2 hover:scale-105">Two</div>
          <div className="boxh box2a hover:scale-105">Two</div>
          <div className="boxh box2a hover:scale-105">Two</div>
          <div className="boxh box2a hover:scale-105">Two</div>
          <div className="boxh box2a hover:scale-105">Two</div>
        </div>
        <div className="boxr">
          <div className="boxh box3 hover:scale-105">Three</div>
          <div className="boxh box3a hover:scale-105">Three</div>
          <div className="boxh box3a hover:scale-105">Three</div>
          <div className="boxh box3a hover:scale-105">Three</div>
          <div className="boxh box3a hover:scale-105">Three</div>
        </div>
        <div className="boxr">
          <div className="boxh box4 hover:scale-105">Four</div>
          <div className="boxh box4a hover:scale-105">Four</div>
          <div className="boxh box4a hover:scale-105">Four</div>
          <div className="boxh box4a hover:scale-105">Four</div>
          <div className="boxh box4a hover:scale-105">Four</div>
        </div>
      </div>
    </div>
  );
}
