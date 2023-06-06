import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
import LoadingGIF from "../../images/loading.gif";

// Define the Loading component
export default function Loading() {
  // state
  const [count, setCount] = useState(1); // Initialize the count state variable to 1

  // hooks
  const navigate = useNavigate(); // Get the navigate function from react-router-dom
  const location = useLocation();
  // console.log(location);

  // Set up an effect using useEffect
  useEffect(() => {
    // Set up a timer using setInterval
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1); // Decrement the count value by 1 every 3seconds
    }, 3000);

    // toast.loading("Loading"); // Display the loading toast

    // Redirect once the count reaches 0
    if (count === 0) {
      // toast.dismiss();
      navigate("/login", {
        state: location.pathname,
      });
    }

    // Clean up the interval when the component unmounts or when the count value changes
    return () => {
      clearInterval(interval);
      // toast.dismiss();
    };
  }, [count, location.pathname, navigate]);

  // Render the JSX for the Loading component
  return (
    <div className="container main-content d-flex justify-content-center align-items-center">
      <img src={LoadingGIF} alt="Loading" style={{ width: "200px" }} />
    </div>
  );
}
