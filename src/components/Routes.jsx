import React, { useEffect, useState } from 'react'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import Layout from './Layout'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

const AppRoutes = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "My First Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        },
        {
            id: 2,
            title: "My 2nd Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        },
        {
            id: 3,
            title: "My 3rd Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        },
        {
            id: 4,
            title: "My Fourth Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        }
    ])

    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const navigate = useNavigate() //to navigate what page to land after a certain process

    useEffect(() => {
        //filter data using search box
        const filteredResults = posts.filter(post => 
            post.body.toLowerCase().includes(search.toLowerCase()) || post.title.toLowerCase().includes(search.toLowerCase())
        )

        setSearchResults(filteredResults.reverse())
    }, [posts, search])

    const handleSubmit = (e) => {
        e.preventDefault()

        const id = posts.length ? posts[posts.length - 1].id + 1 : 1
        const dateTime = format(new Date(), 'MMMM dd, yyyy pp')
        const newPost = {
            id, 
            title: postTitle, 
            dateTime, 
            body: postBody
        }
        const allPosts = [...posts, newPost]

        setPosts(allPosts)
        setPostTitle('')
        setPostBody('')
        navigate('/react-router_v2/')
    }

    const handleDelete = (id) => {
        const postsList = posts.filter(post => post.id !== id)
        
        setPosts(postsList)
        navigate('/react-router_v2/') //back to index page after post deletion
    }

    return (
        <>
            <Routes>
                <Route path='/react-router_v2/' element={<Layout 
                    search={search}
                    setSearch={setSearch}
                />}
                >
                    //index keyword means this is the default page of Layout.
                    <Route index element={<Home 
                        posts={searchResults}
                    />}
                    /> 

                    //nested routing
                    //index keyword means this is the default page of Layout.
                    <Route path='/react-router_v2/post'> 

                        <Route index element={<NewPost 
                            handleSubmit={handleSubmit}
                            postTitle={postTitle}
                            setPostTitle={setPostTitle}
                            postBody={postBody}
                            setPostBody={setPostBody}
                        />} 
                        />

                        <Route path=':id' element={<PostPage 
                            posts={posts}
                            handleDelete={handleDelete}
                        />} 
                        />
                    </Route>

                    <Route path='/react-router_v2/about' element={<About />} />

                    <Route path='*' element={<Missing />} />
                </Route>
            </Routes> 
        </>
    )
}

export default AppRoutes