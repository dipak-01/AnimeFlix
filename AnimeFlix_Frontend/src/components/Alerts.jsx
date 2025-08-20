import { useAlert } from "./AlertContext";

function AlertComponent() {
  const { alert } = useAlert();

  if (!alert.show) return null;

  // const alertStyle = {
  //     position: 'fixed',
  //     top: '20px',
  //     right: '20px',
  //     backgroundColor: 'lightgreen',
  //     color: 'green',
  //     padding: '10px',
  //     borderRadius: '5px'{alert.message},
  //     boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  //     zIndex: 1000, // Ensure it's above most other content.
  // };

  if (alert.type === "success") return <SuccessAlert keyword={alert.message} />;
  if (alert.type === "failure") return <FailedAlert keyword={alert.message} />;
  if (alert.type === "added") return <AddNotification keyword={alert.message} />;
}
const FailedAlert = () => (
  <div className="fixed left-1/2 top-8 z-50 w-full max-w-xs -translate-x-1/2 sm:max-w-sm md:max-w-md">
    <div
      className="mb-4 flex items-center gap-3 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800 shadow-lg dark:border-red-800 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <svg
        className="inline h-5 w-5 flex-shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">Danger alert!</span> Change a few things
        up and try submitting again.
      </div>
    </div>
  </div>
);
const SuccessAlert = ({ keyword }) => (
  <div className="fixed left-1/2 top-8 z-50 w-full max-w-xs -translate-x-1/2 sm:max-w-sm md:max-w-md">
    <div
      className="mb-4 flex items-center gap-3 rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-800 shadow-lg dark:border-green-800 dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      <svg
        className="inline h-5 w-5 flex-shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">User {keyword} Successfully</span> Now you
        can enjoy your anime
      </div>
    </div>
  </div>
);

const AddNotification = ({ keyword }) => {
  return (
    <div className="fixed left-1/2 top-8 z-50 w-full max-w-xs -translate-x-1/2 sm:max-w-sm md:max-w-md">
      <div
        className="mb-4 flex items-center gap-3 rounded-lg bg-blue-50 p-4 text-sm font-semibold text-blue-800 shadow-lg dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        {keyword === "added" && (
          <i className="far fa-circle-check dark:text-blue-400"></i>
        )}
        {keyword === "deleted" && (
          <i className="fas fa-trash dark:text-blue-400"></i>
        )}
        <span className="sr-only">Info</span>
        <div>
          <span className="font-semibold">{keyword}</span>
        </div>
      </div>
    </div>
  );
};
export default AlertComponent;
