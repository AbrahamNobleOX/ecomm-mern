import Jumbotron from "../components/cards/Jumbotron";
import Cards from "../components/cards/Cards";

export default function Home() {
  return (
    <>
      <div className="container main-content mb-5">
        <Jumbotron title="Hello Customers..." />
        <Cards
          caption="Shop with us Everyday."
          image="https://th.bing.com/th/id/R.e1707c345d5ac10c80a674030e606643?rik=pOsTg5KBoLuNvw&riu=http%3a%2f%2fwww.snut.fr%2fwp-content%2fuploads%2f2015%2f08%2fimage-de-paysage.jpg&ehk=1O5SWKkGpZ8yU%2b%2fAnLXG1v8k6BKxgyiXgHbOWBW1ir0%3d&risl=1&pid=ImgRaw&r=0"
        />
      </div>
    </>
  );
}
