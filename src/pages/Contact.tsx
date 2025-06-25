import { Contacts } from "@/json/Contact.json";

const Contact = () => {
  return (
    <section id="Contact" className="div bg-dull-black">
      <div className="grid grid-cols-2 grid-rows-2 div">
        {Contacts.map(({ icon, link }, i) => {
          const isGit = link.includes("github");
          return (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="center border div group"
            >
              <img
                src={icon}
                alt={`contact-${i}`}
                className={`md:w-40 w-20 aspect-square grayscale-100 group-hover:grayscale-0 duration-150 group-hover:scale-105 ${
                  isGit ? "group-hover:invert-100" : ""
                }`}
              />
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default Contact;
