import axios from 'axios';
import AnimationWrapper from '../common/AnimationWrapper';
import InPageNavigation from '../components/InPageNavigation';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import BlogPostCard from '../components/BlogPostCard';

const HomePage = () => {
    const [blogs, setBlogs] = useState();

    const fetchLatestBlogs = () => {
        axios
            .get(import.meta.env.VITE_SERVER_DOMAIN + '/latest-blogs')
            .then(({ data }) => {
                setBlogs(data.blogs);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchLatestBlogs();
    }, []);

    return (
        <AnimationWrapper>
            <section className="h-cover flex justify-center gap-10">
                {/* latest blogs  */}
                <div className="w-full">
                    <InPageNavigation routes={['home', 'trending blog']} defaultHidden={['trending blog']}>
                        {blogs == null ? (
                            <Loader />
                        ) : (
                            blogs.map((blog, i) => {
                                return (
                                    <AnimationWrapper key={i} transition={{ duration: 1, delay: i * 0.1 }}>
                                        <BlogPostCard content={blog} author={blog.author.personal_info} />
                                    </AnimationWrapper>
                                );
                            })
                        )}

                        <h1>Trending Blogs Here</h1>
                    </InPageNavigation>
                </div>

                {/* filters and trending blogs  */}
                <div></div>
            </section>
        </AnimationWrapper>
    );
};

export default HomePage;
