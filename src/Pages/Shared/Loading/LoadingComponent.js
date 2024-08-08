import React, { useState, useEffect } from "react";

const LoadingComponent = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setLoading(false);
          clearInterval(timer);
          return 1000;
        }
        return prevProgress + 1; // Increment the progress as needed
      });
    }, 300); // Adjust the interval time as needed

    return () => clearInterval(timer); // Cleanup timer
  }, []);

  return (
    <div className="loading-container">
      {loading ? (
        <div className="loading-content">
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="font-bold text-2xl mb-2 text-green-300">
            Loading... {progress}%
          </p>
          <p className="text-xl font-semibold">Redirecting to LMS</p>
        </div>
      ) : (
        <div className="loading-content">
          <h1 className="font-bold text-3xl mb-2 text-green-300">
            Loading Complete!
          </h1>
          <p className="text-xl font-semibold">Your content is now ready.</p>
        </div>
      )}
      <style jsx>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh; /* Full height of the viewport */
          text-align: center;
        }

        .loading-content {
          width: 100%;
          max-width: 400px;
        }

        .progress-bar-container {
          width: 100%;
          background-color: #f3f3f3;
          border-radius: 5px;
          overflow: hidden;
          margin: 20px auto;
        }

        .progress-bar {
          height: 30px;
          background-color: #86efac;
          width: 0;
          transition: width 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoadingComponent;
