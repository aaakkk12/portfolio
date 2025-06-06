function Resume() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Resume</h1>

      <div className="w-full md:w-[80%] h-[600px] shadow-lg border mb-6">
        <iframe
          src="/resume.pdf"
          title="Resume PDF"
          className="w-full h-full"
        ></iframe>
      </div>

      <a
        href="/resume.pdf"
        download
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Download Resume
      </a>
    </div>
  );
}

export default Resume;
