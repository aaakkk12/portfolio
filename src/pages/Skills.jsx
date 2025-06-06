function Skills() {
  const skills = [
    {
      name: "HTML",
      image: "images/html.png",
      description: "Markup language for creating structured web content.",
    },
    {
      name: "CSS",
      image: "images/css.png",
      description: "Stylesheet language used to design visually engaging web pages.",
    },
    {
      name: "JavaScript",
      image: "images/javascript.png",
      description: "Programming language for interactive and dynamic web applications.",
    },
    {
      name: "React",
      image: "images/react.png",
      description: "JavaScript library for building fast and interactive user interfaces.",
    },
    {
      name: "Django",
      image: "images/django.jpeg",
      description: "High-level Python web framework that encourages rapid development.",
    },
    {
      name: "MySQL",
      image: "images/mysql.png",
      description: "Popular relational database used to store structured data.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Skills</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center"
          >
            <img
              src={skill.image}
              alt={skill.name}
              className="w-20 h-20 mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">{skill.name}</h2>
            <p className="text-gray-600 text-sm mt-2">{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
