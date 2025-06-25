const Contacts = [
  {
    icon: "/src/assets/svg/insta.svg",
    link: "https://www.instagram.com/shivam4940.exe",
  },
  {
    icon: "/src/assets/svg/linkedin.svg",
    link: "https://www.linkedin.com/in/shivam-singh-37b56b28b/",
  },
  {
    icon: "/src/assets/svg/git.svg",
    link: "https://github.com/shivam4940x",
  },
  {
    icon: "/src/assets/svg/mail.svg",
    link: "mailto:shivam@gmail.com",
  },
];

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
