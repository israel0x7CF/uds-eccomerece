"use client"
import React from 'react';
import 'src/styles/styles.css'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

type props ={
    url:string
}
const AnimatedButton = ({url}:props) => {
    const router = useRouter()
    const handleNavigationButtonChange = (url:string)=>{
        router.push(url)
    }
  return (
    <Link className="animated-button" href={url} prefetch={true}>
      <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
      </svg>
      <span className="text">Shop</span>
      <span className="circle"></span>
      <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
      </svg>
    </Link>
  );
};

export default AnimatedButton;
