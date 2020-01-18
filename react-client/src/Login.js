import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function Login({ setUser }) {


  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
      history.replace(from);
  };

  return (
    <div className="w-full max-w-md bg-gray-800 mx-auto mt-64" >
      <form onSubmit={login} className=" bg-white shadow-md rounded px-8 py-8 pt-8">
        <div className="px-4 pb-4">
          <label htmlFor="user" className="text-sm block font-bold  pb-2">USERNAME</label>
          <input onChange={e=> setUser(e.target.value)} name="user" id="" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " placeholder="username"/>
        </div>
        <div>
          <button onClick={login} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Sign In</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
