import axios from 'axios';
import AnimationWrapper from '../common/AnimationWrapper';
import InPageNavigation, { activeTagRef } from '../components/InPageNavigation';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import BlogPostCard from '../components/BlogPostCard';
import MinimalBlogPost from '../components/MinimalBlogPost';

const HomePage = () => {
    const [blogs, setBlogs] = useState(null);
    const [trendingBlogs, setTrendingBlogs] = useState(null);
    const [pageState, setPageState] = useState('home');

    let categories = ['programming', 'hollywood', 'election', 'social media', 'cricket', 'football', 'tech', 'finance', 'travel'];

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

    const fetchTrendingBlogs = () => {
        axios
            .get(import.meta.env.VITE_SERVER_DOMAIN + '/trending-blogs')
            .then(({ data }) => {
                setTrendingBlogs(data.blogs);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const loadBlogByCategory = (e) => {
        let category = e.target.innerText.toLowerCase();

        setBlogs(null);

        if (pageState == category) {
            setPageState('home');
            return;
        }

        setPageState(category);
    };

    useEffect(() => {
        activeTagRef.current.click();

        if (pageState == 'home') {
            fetchLatestBlogs();
        }

        if (trendingBlogs == null) {
            fetchTrendingBlogs();
        }
    }, [pageState, trendingBlogs]);

    return (
        <AnimationWrapper>
            <section className="h-cover flex justify-center gap-10">
                {/* latest blogs  */}
                <div className="w-full">
                    <InPageNavigation routes={[pageState, 'trending blog']} defaultHidden={['trending blog']}>
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

                        {trendingBlogs == null ? (
                            <Loader />
                        ) : (
                            trendingBlogs.map((blog, i) => {
                                return (
                                    <AnimationWrapper transition={{ duration: 1, delay: i * 0.1 }} key={i}>
                                        <MinimalBlogPost content={blog} index={i} />
                                    </AnimationWrapper>
                                );
                            })
                        )}
                    </InPageNavigation>
                </div>

                {/* filters and trending blogs  */}
                <div className="min-w-[40%] lg:min-w-[405px] max-w-min border-l border-gray pl-8 pt-3 max-md:hidden">
                    <div className="flex flex-col gap-10">
                        <div>
                            <h1 className="font-medium text-xl mb-8">Stories from all interests</h1>

                            <div className="flex flex-wrap gap-3">
                                {categories.map((category, i) => {
                                    return (
                                        <button onClick={loadBlogByCategory} key={i} className={'tag ' + (pageState == category ? 'bg-black text-white' : '')}>
                                            {category}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h1 className="font-medium text-xl mb-8">
                                Trending <i className="fi fi-rr-arrow-trend-up"></i>
                            </h1>

                            {trendingBlogs == null ? (
                                <Loader />
                            ) : (
                                trendingBlogs.map((blog, i) => {
                                    return (
                                        <AnimationWrapper transition={{ duration: 1, delay: i * 0.1 }} key={i}>
                                            <MinimalBlogPost content={blog} index={i} />
                                        </AnimationWrapper>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </AnimationWrapper>
    );
};

export default HomePage;
