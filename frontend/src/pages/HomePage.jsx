import axios from 'axios';
import AnimationWrapper from '../common/AnimationWrapper';
import InPageNavigation from '../components/InPageNavigation';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';

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
                                return <h1 key={i}>{blog.title}</h1>;
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
