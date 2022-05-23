export const AboutPage: React.FC = () => {
  return (
    <section className="container about">
      <p className="about__question">
        <span>
          <b>Q:</b> What is redNovelDex?
        </span>
        <span>
          <b>A:</b> Rednovel allows user to track visual novels, write reviews
          for them, create lists of novels, find new novels to read. Database of
          novels is provided by the biggest visual novel database —{" "}
          <a href="https://vndb.org">vndb</a>
        </span>
      </p>
      <p className="about__question">
        <span>
          <b>Q:</b> How can I help you?
        </span>
        <span>
          <b>A:</b> This project is open-source. If you have any suggestions on
          how to improve it, you can contact me via{" "}
          <a href="https://github.com/SilvioJPEG">github</a>
        </span>
      </p>
    </section>
  );
};
