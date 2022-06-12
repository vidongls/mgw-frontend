import React from "react"
import DefaultLayout from "../../Component/Layout/Default"
import useAuth from "../../hooks/useAuth"

type Props = {}

const Home = (props: Props) => {
    const { auth }: any = useAuth()
    console.log(auth);
	return <p>Home</p>
}

export default Home
