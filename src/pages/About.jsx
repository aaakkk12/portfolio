import { useEffect, useState } from "react";

const titles = ["Software Developer", "Full Stack Developer", "Django Developer"];

function About() {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = titles[index];
    let timeout;

    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setText(current.substring(0, charIndex));
        setCharIndex(charIndex + 1);
      }, 150);
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setText(current.substring(0, charIndex));
        setCharIndex(charIndex - 1);
      }, 100);
    } else {
      setDeleting(!deleting);
      if (!deleting) {
        timeout = setTimeout(() => {}, 1000);
      } else {
        setIndex((index + 1) % titles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, index]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 md:px-20 bg-gray-50">
      
      {/* Left Content */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          I am <span className="text-blue-600">{text}|</span>
        </h1>

        {/* ✅ Summary Section Added Below Typing */}
        <p className="text-gray-700 text-lg mt-4">
          I'm a passionate software developer skilled in building dynamic and scalable web applications. 
          I have hands-on experience with tools like <strong>JavaScript</strong>, <strong>React</strong>, 
          <strong> Django</strong>, <strong>MySQL</strong>, and more.
        </p>

        <p className="text-gray-600 mt-6 text-lg leading-relaxed">
          I specialize in building dynamic and responsive websites. I have experience working with:
        </p>

        <ul className="list-disc pl-5 text-left text-gray-700 space-y-2">
          <li><strong>React:</strong> Building interactive UIs and components</li>
          <li><strong>Django:</strong> Secure and scalable backend systems</li>
          <li><strong>HTML/CSS:</strong> Clean and semantic web structure</li>
          <li><strong>JavaScript:</strong> Frontend logic and dynamic features</li>
        </ul>
      </div>

      {/* Right Side Image */}
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <div className="w-72 h-72 bg-gray-200 rounded-full overflow-hidden shadow-md">
          <img
            src="src/assets/images.png"
            alt="My Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
