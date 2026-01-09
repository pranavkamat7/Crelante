import React, { useState, useEffect } from "react";
import { ExternalLink, Github, Loader2 } from "lucide-react";

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const PROJECTS_LIMIT = 6;

  // Fallback projects if API fails
  const fallbackProjects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Web App",
      description:
        "Full-featured online store with payment integration and admin dashboard",
      color: "from-purple-500 to-pink-500",
      tags: ["React", "Node.js", "MongoDB"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      id: 2,
      title: "Business Portfolio Website",
      category: "Web App",
      description:
        "Modern portfolio website with animations and responsive design",
      color: "from-blue-500 to-cyan-500",
      tags: ["React", "Tailwind", "Framer Motion"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      id: 3,
      title: "Instagram Growth & Management",
      category: "Digital Marketing",
      description:
        "Handling Instagram accounts, content strategy, reels growth and engagement optimization",
      color: "from-pink-500 to-rose-500",
      tags: ["Instagram", "Content Strategy", "Reels Growth"],
      github: null,
      demo: "https://example.com",
    },
    {
      id: 4,
      title: "Product Photography",
      category: "Creative Studio",
      description:
        "High-quality product photography for brands, e-commerce and social media",
      color: "from-yellow-500 to-orange-500",
      tags: ["Photography", "Product Shoot", "Branding"],
      github: null,
      demo: "https://example.com",
    },
    {
      id: 5,
      title: "Dashboard Analytics",
      category: "Web App",
      description:
        "Real-time analytics dashboard with charts and data visualization",
      color: "from-green-500 to-teal-500",
      tags: ["React", "Django", "PostgreSQL"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      id: 6,
      title: "Brand Promotional Video",
      category: "Creative Studio",
      description:
        "Short promotional videos and reels for brand awareness and marketing",
      color: "from-red-500 to-pink-500",
      tags: ["Videography", "Reels", "Brand Video"],
      github: null,
      demo: "https://example.com",
    },
    {
      id: 7,
      title: "Restaurant Website",
      category: "Web App",
      description:
        "Restaurant website with menu showcase and online ordering system",
      color: "from-amber-500 to-orange-500",
      tags: ["React", "Node.js", "MongoDB"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      id: 8,
      title: "Graphic Design for Social Media",
      category: "Creative Studio",
      description:
        "Eye-catching posters, banners and creatives for social media marketing",
      color: "from-indigo-500 to-purple-500",
      tags: ["Graphic Design", "Posters", "Brand Creatives"],
      github: null,
      demo: "https://example.com",
    },
    {
      id: 9,
      title: "Fitness Tracking App",
      category: "Web App",
      description:
        "Fitness app with workout plans, progress tracking and user dashboard",
      color: "from-emerald-500 to-lime-500",
      tags: ["React", "Node.js", "MongoDB"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      id: 10,
      title: "Social Media Ads & Campaigns",
      category: "Digital Marketing",
      description:
        "Paid ad campaigns, audience targeting and performance tracking",
      color: "from-sky-500 to-blue-500",
      tags: ["Meta Ads", "Marketing", "Lead Generation"],
      github: null,
      demo: "https://example.com",
    },
  ];

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProjects(fallbackProjects);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);

    // Simulate loading for better UX
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Use fallback data directly (no API calls to avoid CORS issues)
    setProjects(fallbackProjects);
    setLoading(false);
  };

  const categories = ["All", "Creative Studio", "Web App", "Digital Marketing"];

  const filteredProjects =
    filter === "All"
      ? showAll
        ? projects
        : projects.slice(0, PROJECTS_LIMIT)
      : projects.filter((project) => project.category === filter);

  useEffect(() => {
    setShowAll(false);
  }, [filter]);

  return (
    <section id="projects" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Take a look at some of our recent work
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  filter === category
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading amazing projects...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Project Image */}
                  <div
                    className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>

                    {/* Overlay Icons */}
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="text-sm text-blue-600 font-semibold mb-2">
                      {project.category}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 mb-4">{project.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filter === "All" && projects.length > PROJECTS_LIMIT && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowAll((prev) => !prev)}
                  className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl transition-all duration-300"
                >
                  {showAll ? "Show Less" : "View All Projects"}
                </button>
              </div>
            )}

            {/* Empty State */}
            {filteredProjects.length === 0 && !loading && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-600 text-lg mb-2">
                  No projects found in this category.
                </p>
                <button
                  onClick={() => setFilter("All")}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  View all projects
                </button>
              </div>
            )}
          </>
        )}

        {/* Action Buttons */}
        <div className="text-center mt-12 space-y-4">
          <button
            onClick={fetchProjects}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Loader2 className={loading ? "animate-spin" : ""} size={20} />
            {loading ? "Loading..." : "Refresh Projects"}
          </button>

          <div className="block">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Start Your Project
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {projects.length}+
            </div>
            <div className="text-sm text-gray-600">Projects Completed</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-1">50+</div>
            <div className="text-sm text-gray-600">Happy Clients</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
            <div className="text-3xl font-bold text-orange-600 mb-1">99%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-1">3+</div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
