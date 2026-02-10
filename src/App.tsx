import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Sparkles,
  Heart,
  ArrowRight,
  Star,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { experience, projects, skills } from "./skillsDetails";
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded] = useState(true);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const sections = [
    { name: "about", ref: aboutRef },
    { name: "skills", ref: skillsRef },
    { name: "projects", ref: projectsRef },
    { name: "experience", ref: experienceRef },
    { name: "contact", ref: contactRef },
  ];

  
  // Intersection Observer to highlight current section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute("data-section");
            if (sectionName) setActiveSection(sectionName);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    sections.forEach(
      (sec) => sec.ref.current && observer.observe(sec.ref.current),
    );

    return () => {
      sections.forEach(
        (sec) => sec.ref.current && observer.unobserve(sec.ref.current),
      );
    };
  }, []);

  // Scroll to section
  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  return (
    <>
      <div
        className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-100 to-fuchsia-100 relative overflow-hidden animate-gradient"
        style={{ backgroundSize: "400% 400%" }}
      >
        <div
          className="fixed w-[500px] h-[500px] rounded-full opacity-40 blur-3xl pointer-events-none transition-all duration-700 ease-out"
          style={{
            background:
              "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(219, 39, 119, 0.2) 40%, rgba(168, 85, 247, 0.1) 70%, transparent 100%)",
            left: mousePosition.x - 250,
            top: mousePosition.y - 250,
          }}
        />

        {/* Decorative floating elements with more ombre */}
        <div className="fixed top-20 right-20 w-80 h-80 bg-gradient-to-br from-pink-300 via-rose-400 to-fuchsia-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
        <div
          className="fixed bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-rose-300 via-pink-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="fixed top-1/2 left-1/2 w-72 h-72 bg-gradient-to-bl from-fuchsia-300 via-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="fixed top-1/3 right-1/3 w-64 h-64 bg-gradient-to-tl from-violet-300 via-fuchsia-300 to-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float"
          style={{ animationDelay: "3s" }}
        />
        <div className="relative z-10">
          {/* Navigation */}
          <nav
            className={`fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-xl border-b border-gradient-to-r from-pink-200 via-rose-200 to-fuchsia-200 z-50 transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="relative">
                  <Code2 className="w-8 h-8 text-pink-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
                  <div className="absolute inset-0 bg-pink-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                </div>
                <span
                  className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 bg-clip-text text-transpareant animate-gradient"
                  style={{ backgroundSize: "200%" }}
                >
                  Adeeko Feyisetan
                </span>
              </div>

             <div className="flex gap-6">
            {sections.map((sec, idx) => (
              <button
                key={sec.name}
                onClick={() => scrollToSection(sec.ref)}
                      className={`capitalize text-sm font-medium transition-all duration-500 hover:text-transparent hover:bg-gradient-to-r hover:from-pink-600 hover:via-rose-600 hover:to-fuchsia-600 hover:bg-clip-text relative group ${
                        activeSection === sec.name
                          ? "text-transparent bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 bg-clip-text"
                          : "text-gray-600"
                      }`}
                      style={{
                        transitionDelay: `${idx * 50}ms`,
                      }}
                    >
                      {sec.name}
                      {activeSection === sec.name && (
                        <span
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 rounded-full animate-gradient"
                          style={{ backgroundSize: "200%" }}
                        />
                      )}
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  ),
                )}
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section
           ref={aboutRef} data-section="about" 
            className={`pt-32 pb-20 px-6 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full text-pink-700 text-sm font-medium animate-pulse">
                    <Sparkles className="w-4 h-4" />
                    Available for new opportunities
                  </div>

                  <h1 className="text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 bg-clip-text text-transparent">
                      Adeeko Feyisetan{" "}
                    </span>
                  </h1>
                  <p className="text-4xl text-transparent bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 bg-clip-text">
                    Frontend Developer
                  </p>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                    Frontend developer with a passion for crafting beautiful,
                    performant, and accessible web experiences. With 5 years of
                    expertise in React, TypeScript, and modern web technologies,
                    I specialize in turning complex problems into elegant
                    solutions. Let's build something amazing together!
                  </p>

                  <div className="flex gap-4 pt-4">
                    <button
                      className="group relative px-8 py-4 bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 text-white rounded-full font-medium overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-300 animate-gradient"
                      style={{ backgroundSize: "200%" }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        View My Work
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </button>
                    <button className="group px-8 py-4 bg-white text-pink-600 rounded-full font-medium border-2 border-pink-300 hover:border-transparent overflow-hidden relative transition-all duration-500 hover:scale-105 hover:text-white hover:shadow-xl">
                      <a
                        href="/FeyisetanAdeekoCv.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="relative z-10">Download CV</span>
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient"
                          style={{ backgroundSize: "200%" }}
                        />
                      </a>
                    </button>
                  </div>

                  <div className="flex gap-6 pt-6">
                    {[
                      { Icon: Github, href: "https://github.com/ifeoluwa265" },
                      {
                        Icon: Linkedin,
                        href: "https://www.linkedin.com/in/adeekofeyi/",
                      },
                      { Icon: Mail, href: "mailto:adeekofeyi@gmail.com" },
                    ].map(({ Icon, href }, index) => (
                      <a
                        key={index}
                        href={href}
                        className="group relative text-gray-600 hover:text-white transition-all duration-500 hover:scale-125"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-600 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                        <div className="relative bg-white group-hover:bg-gradient-to-br group-hover:from-pink-500 group-hover:via-rose-500 group-hover:to-fuchsia-600 p-3 rounded-lg transition-all duration-500 shadow-md group-hover:shadow-xl">
                          <Icon className="w-6 h-6" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="relative w-full aspect-square max-w-md mx-auto">
                    {/* Animated rings with ombre colors */}
                    <div className="absolute inset-0 rounded-full border-2 border-pink-400 animate-ping opacity-20" />
                    <div
                      className="absolute inset-4 rounded-full border-2 border-rose-400 animate-ping opacity-30"
                      style={{ animationDelay: "0.5s" }}
                    />
                    <div
                      className="absolute inset-8 rounded-full border-2 border-fuchsia-400 animate-ping opacity-40"
                      style={{ animationDelay: "1s" }}
                    />

                    {/* Rotating gradient ring */}
                    <div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 via-fuchsia-500 to-purple-500 opacity-20 blur-2xl animate-spin"
                      style={{ animationDuration: "10s" }}
                    />

                    {/* Profile card with enhanced ombre */}
                    <div
                      className="absolute inset-12 bg-gradient-to-br from-pink-500 via-rose-500 via-fuchsia-600 to-purple-600 rounded-3xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-all duration-700 hover:rotate-3 animate-gradient animate-glow group cursor-pointer"
                      style={{ backgroundSize: "200% 200%" }}
                    >
                      <div className="text-white text-center relative z-10">
                        <div className="text-8xl mb-4 animate-bounce-subtle">
                          👩‍💻
                        </div>
                        <div className="text-2xl font-bold group-hover:scale-110 transition-transform duration-500">
                          5+ Years
                        </div>
                        <div className="text-pink-100 group-hover:text-white transition-colors duration-500">
                          Experience
                        </div>
                        <div className="mt-4 flex gap-2 justify-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 text-yellow-300 fill-yellow-300 animate-pulse"
                              style={{ animationDelay: `${i * 0.1}s` }}
                            />
                          ))}
                        </div>
                      </div>
                      {/* Shimmer effect */}
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 animate-shimmer rounded-3xl"
                        style={{ backgroundSize: "200% 100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section 
          ref={skillsRef}
        data-section="skills"
        className="py-20 px-6 bg-gradient-to-br from-white/60 via-pink-50/60 to-rose-50/60 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2
                  className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-rose-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent animate-gradient"
                  style={{ backgroundSize: "200%" }}
                >
                  Technical Expertise
                </h2>
                <p className="text-gray-600 text-lg">
                  Technologies I work with daily
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`relative bg-white rounded-2xl p-6 transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl cursor-pointer group overflow-hidden ${
                      hoveredSkill === skill.name ? "scale-105" : ""
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Gradient border effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${skill.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl`}
                    />
                    <div className="absolute inset-0.5 bg-white rounded-2xl" />

                    <div className="relative z-10">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl group-hover:scale-125 transition-transform duration-500">
                            {skill.icon}
                          </span>
                          <h3
                            className="text-xl font-bold text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-500"
                            style={{
                              backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                            }}
                            // className={`text-xl font-bold text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${skill.gradient} group-hover:bg-clip-text transition-all duration-500`}
                          >
                            {skill.name}
                          </h3>
                        </div>
                        <span
                          className={`text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r ${skill.gradient} text-white shadow-lg group-hover:shadow-xl transition-shadow duration-500`}
                        >
                          {skill.years} yrs
                        </span>
                      </div>

                      <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.gradient} rounded-full transition-all duration-1000 ease-out shadow-lg animate-gradient`}
                          style={{
                            width: isLoaded ? `${skill.level}%` : "0%",
                            backgroundSize: "200%",
                          }}
                        >
                          {/* Shimmer effect on progress bar */}
                          <div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"
                            style={{ backgroundSize: "200% 100%" }}
                          />
                        </div>
                      </div>

                      <div className="mt-3 flex justify-between items-center">
                        <span
                          className={`text-sm font-semibold bg-gradient-to-r ${skill.gradient} bg-clip-text text-transparent`}
                        >
                          {skill.level}% proficiency
                        </span>
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${skill.gradient} group-hover:scale-150 transition-transform duration-500 shadow-lg`}
                        />
                      </div>
                    </div>

                    {/* Floating particles on hover */}
                    {hoveredSkill === skill.name && (
                      <>
                        <div
                          className={`absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-r ${skill.gradient} animate-ping`}
                        />
                        <div
                          className={`absolute bottom-4 left-4 w-2 h-2 rounded-full bg-gradient-to-r ${skill.gradient} animate-ping`}
                          style={{ animationDelay: "0.2s" }}
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section 
          ref={projectsRef} data-section="projects" className="py-20 px-6 relative overflow-hidden">
            {/* Animated background gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-50 via-fuchsia-50 to-purple-50 animate-gradient"
              style={{ backgroundSize: "400% 400%" }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <h2
                  className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-rose-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent animate-gradient"
                  style={{ backgroundSize: "200%" }}
                >
                  Featured Projects
                </h2>
                <p className="text-gray-600 text-lg">Some of my best work</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <div
                    key={`${project.title}-${index}`}
                    onMouseEnter={() => setHoveredProject(project.title)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="group relative rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl cursor-pointer"
                  >
                    {/* Gradient border */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-500 via-fuchsia-600 to-purple-600 animate-gradient p-[2px] rounded-3xl"
                      style={{ backgroundSize: "200% 200%" }}
                    >
                      <div className="bg-white rounded-3xl h-full" />
                    </div>

                    <div className="relative z-10 bg-white rounded-3xl overflow-hidden">
                      <div
                        className={`h-56 bg-gradient-to-br relative overflow-hidden transition-all duration-700 ${
                          index === 0
                            ? "from-pink-400 via-rose-500 to-red-500"
                            : index === 1
                              ? "from-purple-400 via-fuchsia-500 to-pink-500"
                              : index === 2
                                ? "from-cyan-400 via-blue-500 to-purple-500"
                                : "from-orange-400 via-pink-500 to-fuchsia-500"
                        } animate-gradient`}
                        style={{ backgroundSize: "200% 200%" }}
                      >
                        <div className="absolute inset-0 opacity-50">
                          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-float" />
                          <div
                            className="absolute bottom-0 right-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-overlay filter blur-3xl animate-float"
                            style={{ animationDelay: "1s" }}
                          />
                        </div>

                        <div
                          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                            hoveredProject === project.title
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-50"
                          }`}
                        >
                          <div
                            className="bg-white/20 backdrop-blur-md p-6 rounded-2xl"
                            onClick={() => window.open(project.link, "_blank")}
                          >
                            <ExternalLink className="w-12 h-12 text-white drop-shadow-lg" />
                          </div>
                        </div>

                        {/* Shimmer effect */}
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 animate-shimmer"
                          style={{ backgroundSize: "200% 100%" }}
                        />
                      </div>

                      <div className="p-6 relative">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:via-rose-600 group-hover:to-fuchsia-600 group-hover:bg-clip-text transition-all duration-500">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <span
                              key={tech}
                              className={`px-3 py-1.5 rounded-full text-sm font-medium text-white shadow-md group-hover:shadow-lg transition-all duration-500 hover:scale-110 bg-gradient-to-r ${
                                techIndex === 0
                                  ? "from-pink-500 to-rose-500"
                                  : techIndex === 1
                                    ? "from-rose-500 to-fuchsia-500"
                                    : techIndex === 2
                                      ? "from-fuchsia-500 to-purple-500"
                                      : "from-purple-500 to-pink-500"
                              } animate-gradient`}
                              style={{
                                backgroundSize: "200%",
                                animationDelay: `${techIndex * 0.1}s`,
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Hover indicator */}
                        <div
                          className={`mt-4 flex items-center gap-2 text-pink-600 font-medium transition-all duration-500 ${
                            hoveredProject === project.title
                              ? "translate-x-2 opacity-100"
                              : "translate-x-0 opacity-0"
                          }`}
                        >
                          <span>View Project</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section
          ref={experienceRef}
        data-section="experience" className="py-20 px-6 bg-gradient-to-br from-white/70 via-pink-50/70 to-rose-50/70 backdrop-blur-sm relative overflow-hidden">
            {/* Floating gradient orbs */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full blur-3xl opacity-20 animate-float" />
            <div
              className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-fuchsia-300 to-purple-400 rounded-full blur-3xl opacity-20 animate-float"
              style={{ animationDelay: "2s" }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <h2
                  className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-rose-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent animate-gradient"
                  style={{ backgroundSize: "200%" }}
                >
                  Work Experience
                </h2>
                <p className="text-gray-600 text-lg">My professional journey</p>
              </div>

              <div className="space-y-8 max-w-4xl mx-auto">
                {experience.map((exp, index) => (
                  <div
                    key={exp.company}
                    className="group relative bg-white rounded-3xl p-8 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 cursor-pointer overflow-hidden"
                  >
                    {/* Animated gradient border */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${
                        index === 0
                          ? "from-pink-500 via-rose-500 to-fuchsia-600"
                          : "from-purple-500 via-fuchsia-500 to-pink-600"
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl animate-gradient`}
                      style={{ backgroundSize: "200%" }}
                    />
                    <div className="absolute inset-0.5 bg-white rounded-3xl" />

                    <div className="relative z-10">
                      <div className="flex flex-wrap justify-between items-start mb-6">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:via-rose-600 group-hover:to-fuchsia-600 group-hover:bg-clip-text transition-all duration-500">
                            {exp.role}
                          </h3>
                          <p
                            className={`font-medium text-lg bg-gradient-to-r ${
                              index === 0
                                ? "from-pink-600 to-rose-600"
                                : "from-purple-600 to-fuchsia-600"
                            } bg-clip-text text-transparent`}
                          >
                            {exp.company}
                          </p>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r ${
                            index === 0
                              ? "from-pink-500 to-rose-500"
                              : "from-purple-500 to-fuchsia-500"
                          } shadow-md group-hover:shadow-lg transition-shadow duration-500 animate-gradient`}
                          style={{ backgroundSize: "200%" }}
                        >
                          {exp.period}
                        </span>
                      </div>

                      <ul className="space-y-4">
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-gray-700 group/item hover:translate-x-2 transition-transform duration-300"
                          >
                            <div
                              className={`flex-shrink-0 mt-0.5 relative group-hover/item:scale-125 transition-transform duration-500`}
                            >
                              <Heart
                                className={`w-5 h-5 fill-current bg-gradient-to-br ${
                                  index === 0
                                    ? "from-pink-500 to-rose-500"
                                    : "from-purple-500 to-fuchsia-500"
                                } bg-clip-text text-transparent animate-pulse`}
                                style={{ animationDelay: `${i * 0.2}s` }}
                              />
                            </div>
                            <span className="flex-1">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Shimmer effect on hover */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 animate-shimmer pointer-events-none rounded-3xl"
                      style={{ backgroundSize: "200% 100%" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section
           ref={contactRef}
        data-section="contact">
             <footer className="relative mt-20">
            <div className="bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 text-white">
              <div className="max-w-6xl mx-auto px-6 py-16 text-center">
                <h2 className="text-3xl font-extrabold">
                  Let’s build something unforgettable 💖 <br />
                  I'm always interested in hearing about new projects and
                  opportunities. Whether you have a question or just want to say
                  hi, feel free to reach out!
                </h2>
                <p className="mt-3 text-white/90">
                  Full-time • Contract • Freelance
                </p>
                <div className="flex gap-6 text-center align-center justify-center pt-6">
                  {[
                    { Icon: Github, href: "https://github.com/ifeoluwa265" },
                    {
                      Icon: Linkedin,
                      href: "https://www.linkedin.com/in/adeekofeyi/",
                    },
                    { Icon: Mail, href: "mailto:adeekofeyi@gmail.com" },
                  ].map(({ Icon, href }, index) => (
                    <a
                      key={index}
                      href={href}
                      className="group relative text-gray-600 hover:text-white transition-all duration-500 hover:scale-125"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-600 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                      <div className="relative bg-white group-hover:bg-gradient-to-br group-hover:from-pink-500 group-hover:via-rose-500 group-hover:to-fuchsia-600 p-3 rounded-lg transition-all duration-500 shadow-md group-hover:shadow-xl">
                        <Icon className="w-6 h-6" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </footer>
          </section>
         
        </div>
      </div>
    </>
  );
}
