import React from "react";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";

export default function About() {
  const teamMembers = [
    {
      name: "Jewel Louis de Guzman",
      title: "CEO",
      bio: "Passionate about innovation and driving company growth.",
      image: "./src/assets/bruno.jpg", // Replace with actual image paths
      email: "mailto:john.doe@email.com",
      linkedin: "https://www.linkedin.com/in/johndoe/",
    },
    {
      name: "Victor Owen Gacutan",
      title: "CTO",
      bio: "Leads our talented tech team to build amazing products.",
      image: "./src/assets/bruno.jpg", // Replace with actual image paths
      email: "mailto:jane.smith@email.com",
      linkedin: "https://www.linkedin.com/in/janesmith/",
    },
    {
      name: "John Ryan Sumang",
      title: "CTO",
      bio: "Leads our talented tech team to build amazing products.",
      image: "./src/assets/bruno.jpg", // Replace with actual image paths
      email: "mailto:jane.smith@email.com",
      linkedin: "https://www.linkedin.com/in/janesmith/",
    },
    {
      name: "Joshua Tabaranza",
      title: "CTO",
      bio: "Leads our talented tech team to build amazing products.",
      image: "./src/assets/bruno.jpg", // Replace with actual image paths
      email: "mailto:jane.smith@email.com",
      linkedin: "https://www.linkedin.com/in/janesmith/",
    },
  ];

  return (
    <div>
      <section className="items-center text-center rounded-[10px] bg-slate-100 py-12 xl:pt-12 xl:pb-12 overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col items-center h-full">
            <div className=" cutive-mono-regular">
              <div>
                <h1 className="h1 mb-6 cutive-regular font-extrabold text-4xl">
                  Nós nos preocupamos com sua saúde
                </h1>
                <p className="mb-[42px] cutive-mono-regular">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis
                  auteirure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 ">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl cutive-regular font-bold mb-8">
            Meet Our Team
          </h2>
          <p className="text-gray-600 text-lg mb-12 cutive-mono-regular">
            We're a passionate group dedicated to [your mission/vision].
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((person) => (
              <div
                key={person.name}
                className="bg-slate-100 rounded-lg p-6 shadow hover:scale-105 transition"
              >
                <img
                  src={person.image}
                  alt={`Profile of ${person.name}`}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold cutive-regular mb-2 font-courier">
                  {person.name}
                </h3>
                <p className="text-gray-600 cutive-mono-regular mb-2 font-courier">
                  {person.title}
                </p>
                <p className="text-gray-600 cutive-mono-regular font-courier">
                  {person.bio}
                </p>

                {/* Social Media Links (React Icons) */}
                <div className="mt-4 flex justify-center space-x-4 text-2xl">
                  <a href={person.email} aria-label={`Email ${person.name}`}>
                    <FaEnvelope className="hover:text-blue-600" />
                  </a>
                  <a
                    href={person.linkedin}
                    aria-label={`LinkedIn ${person.name}`}
                  >
                    <FaLinkedin className="hover:text-blue-400" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
