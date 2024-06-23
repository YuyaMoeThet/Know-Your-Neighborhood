const Home = () => {
  return (
    <section className="main">
      <div className="main-content">
        <h1 className="text">
          Welcome to Know Your <span>Neighborhood</span>
        </h1>
        <p>
          On our website, you'll find all sorts of information about the
          Neighborhood, from local businesses to important phone numbers and
          resources for residents.
        </p>
        <p>
          Lpsum dolor sit, amet consectetur adipisicing elit. Sit labore
          accusantium earum voluptas quo iusto aut iure modi placeat! Eculpas ad
          optio reprehenderit?
        </p>
        <button className="join-btn">Join Now!</button>
      </div>
      <div className="gallery-container">
        <img src="../img/circle-people.jpg" />
        <img src="../img/discuss-people.jpg" />
        <img src="../img/earth.jpg" />
      </div>
    </section>
  );
};

export default Home;
