import React from "react";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";

export default function About() {
  const teamMembers = [
    {
      name: "Jewel Louis de Guzman",
      title: "Developer",
      bio: "Passionate about innovation and driving company growth.",
      image: "./src/assets/jewel3.jpg",
      email: "mailto:jjewellouis95@gmail.com",
      linkedin: "https://www.linkedin.com/",
    },
    {
      name: "Victor Owen Gacutan",
      title: "Developer",
      bio: "Leads our talented tech team to build amazing products.",
      image: "./src/assets/owen3.jpg",
      email: "mailto:vowengacutan@gmail.com",
      linkedin: "https://www.linkedin.com/in/janesmith/",
    },
    {
      name: "John Ryan Sumang",
      title: "Developer",
      bio: "Leads our talented tech team to build amazing products.",
      image: "./src/assets/sumang.jpg",
      email: "mailto:ryansumang22@gmail.com",
      linkedin: "https://www.linkedin.com/in/john-ryan-s-39290b129/",
    },
    {
      name: "Joshua Tabaranza",
      title: "Developer",
      bio: "Leads our talented tech team to build amazing products.",
      image: "./src/assets/jat.jpg",
      email: "mailto:jatabaranza04@gmail.com",
      linkedin: "https://www.linkedin.com/in/joshua-tabaranza-91a8bb277/",
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
                  Mosquito Ovicidal Larvicidal (OL) Trap System.
                </h1>
                <p className="text-lg mb-[42px] cutive-mono-regular">
                  Our innovative prototype, the Mosquito Ovicidal Larvicidal
                  (OL) Trap System uses image analysis technology for continous
                  monitoring of mosquito larvae, design and enhance vector
                  control strategies. Helping the public health sector gather
                  and record data about the dynamics of mosquito population in a
                  efficient and innovative way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 ">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl cutive-regular font-bold mb-8">
            Meet Our Team.
          </h2>
          <p className="text-black-600 text-lg mb-12 cutive-mono-regular text-justify-center">
            We are a group of dedicated and passionate students from Polytechnic
            University of the Philippines united by our commitment to advancing
            knowledge and contributing to our field of study. Get to know the
            team of our project:
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
                <h3 className="text-lg font-bold cutive-regular mb-2 font-courier">
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
