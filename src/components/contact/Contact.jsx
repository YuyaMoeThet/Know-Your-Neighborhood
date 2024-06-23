import "./contact.css";

const Contact = () => {
  return (
    <>
      <div className="image">
        <h2 className="about_text">Contact Us</h2>
      </div>
      <div className="container">
        <div className="contact">
          <form action="">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name.."
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email.."
            />

            <label htmlFor="country">Country</label>
            <select id="country" name="country">
              <option value="Myanmar">Myanmar</option>
              <option value="Singapore">Singapore</option>
              <option value="USA">USA</option>
            </select>

            <label htmlFor="subject">Your Question</label>
            <textarea placeholder="Write something.."></textarea>

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
