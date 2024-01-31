import AnimationWrapper from '../common/AnimationWrapper';
import InPageNavigation from '../components/InPageNavigation';

const HomePage = () => {
    return (
        <AnimationWrapper>
            <section className="h-cover flex justify-center gap-10">
                {/* latest blogs  */}
                <div className="w-full">
                    <InPageNavigation routes={['home', 'trending blog']} defaultHidden={['trending blog']}>
                        <h1>Latest Blogs Here</h1>

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
