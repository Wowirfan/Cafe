import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-5">
    <h1 className="font-display text-6xl font-semibold text-primary">404</h1>
    <p className="mt-4 text-stone-500">This page doesn't exist — maybe it stepped out for coffee.</p>
    <Link to="/" className="btn-primary mt-8">Back to Home</Link>
  </div>
);

export default NotFound;
