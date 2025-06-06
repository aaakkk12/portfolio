function Projects() {
  const projects = [
    {
      title: "Instagram Clone",
      description:
        "A full-stack social media app where users can post images, follow friends, and send messages — built using Django and JavaScript.",
      image: "images/insta.png",
      tech: ["Django", "Javascript", "Bootstrap"],
    },
    {
      title: "E-Commerce Website",
      description:
        "A modern online store where users can browse, filter, add to cart, and checkout. Integrated with Stripe and Admin dashboard.",
      image: "images/eco.jpeg",
      tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Projects
      </h1>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex flex-col justify-between bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {project.title}
                </h2>
                <p className="text-gray-600">{project.description}</p>

                <div className="flex flex-wrap gap-2 text-sm mt-4">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
