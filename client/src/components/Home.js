import React, { useState, useEffect } from 'react'

const Home = () => {

    const [userName, setUserName] = useState('');
    const [show, setShow] = useState(false);

    const userHomePage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            console.log("data :", data);
            setUserName(data.name);
            setShow(true);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        userHomePage();
    }, []);

    return (
        <><div className="">
            <div className='text-center homePage'>
                <p className='fs-4'>WELCOME</p>
                <h1><strong>{userName}</strong></h1>
                <h2 >{show ? 'Happy to see you back' : 'We are The MERN Developer'}</h2>
            </div>
        </div>
        </>
    )
}

export default Home