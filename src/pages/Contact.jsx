import {
  UserIcon,
  CalendarIcon,
  EnvelopeIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Contact Details</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-5">
        <div className="flex items-center space-x-3">
          <UserIcon className="h-6 w-6 text-blue-500" />
          <span className="text-gray-700 text-lg">Name: <strong>Akshit kolhi</strong></span>
        </div>

        <div className="flex items-center space-x-3">
          <CalendarIcon className="h-6 w-6 text-green-500" />
          <span className="text-gray-700 text-lg">Age: <strong>22</strong></span>
        </div>

        <div className="flex items-center space-x-3">
          <EnvelopeIcon className="h-6 w-6 text-red-500" />
          <span className="text-gray-700 text-lg">Email: <strong>akshitkohli90@gmail.com</strong></span>
        </div>

        <div className="flex items-center space-x-3">
          <LinkIcon className="h-6 w-6 text-purple-500" />
          <span className="text-gray-700 text-lg">
            GitHub:{" "}
            <a
              href="https://github.com/aaakkk12"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              github.com/akshay
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Contact;
