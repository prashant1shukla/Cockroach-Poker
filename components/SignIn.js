//THIS PAGE IS USED FOR LEARNING THE AUTHENTHICATION USING FIREBASE.



import React from "react";
import {signInWithGoogle} from "./firebase";

const SignIn = () => {
  return (
    <div>
    <div>
        Hello
    </div>
    <div>
      <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
      <div className="mt-8">
        <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
          <button onClick={signInWithGoogle}
            className="bg-red-500 hover:bg-red-600 w-full py-2 text-white px-4 rounded">
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};
export default SignIn;