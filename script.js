(function initPortfolio() {
  const content = window.portfolioContent || {};
  const profile = content.profile || {};
  const skills = Array.isArray(content.skills) ? content.skills : [];
  const projects = Array.isArray(content.projects) ? content.projects : [];
  const contacts = Array.isArray(content.contacts) ? content.contacts : [];

  const profileName = document.getElementById("profile-name");
  const profileRole = document.getElementById("profile-role");
  const profileIntro = document.getElementById("profile-intro");
  const heroCta = document.getElementById("hero-cta");
  const profileStats = document.getElementById("profile-stats");
  const skillsList = document.getElementById("skills-list");
  const projectsList = document.getElementById("projects-list");
  const contactsList = document.getElementById("contacts-list");
  const brandLink = document.getElementById("brand-link");
  const footerCopy = document.getElementById("footer-copy");
  const currentYear = document.getElementById("current-year");

  const safeName = profile.name || "홍길동";
  const safeRole = profile.role || "문제를 제품으로 연결하는 개발자";
  const safeIntro =
    profile.intro ||
    "서비스 경험과 구현 디테일을 함께 챙기는 개발자 포트폴리오입니다.";

  document.title = `${safeName} | Developer Portfolio`;
  profileName.textContent = safeName;
  profileRole.textContent = safeRole;
  profileIntro.textContent = safeIntro;
  brandLink.textContent = safeName;
  footerCopy.textContent = `${safeName} Portfolio`;
  currentYear.textContent = String(new Date().getFullYear());

  renderActions(profile.ctaLinks, heroCta);
  renderStats(profileStats, skills, projects, contacts);
  renderSkills(skills, skillsList);
  renderProjects(projects, projectsList);
  renderContacts(contacts, contactsList);
  activateSectionNav();
  revealOnScroll();

  function renderActions(actions, root) {
    const items = Array.isArray(actions) ? actions.slice(0, 2) : [];
    root.replaceChildren();

    if (!items.length) {
      root.appendChild(
        createEmptyState("CTA 링크는 content.js의 profile.ctaLinks에서 설정할 수 있습니다.")
      );
      return;
    }

    items.forEach(function mapAction(action, index) {
      const link = document.createElement("a");
      const url = action && action.url ? action.url : "#projects";

      link.className = `cta-button ${index === 0 ? "primary" : "secondary"}`;
      link.href = url;
      link.textContent = action && action.label ? action.label : `링크 ${index + 1}`;

      if (isExternalUrl(url)) {
        link.target = "_blank";
        link.rel = "noreferrer";
      }

      root.appendChild(link);
    });
  }

  function renderStats(root, skillData, projectData, contactData) {
    const totalSkillTags = skillData.reduce(function countSkills(total, group) {
      return total + (Array.isArray(group.items) ? group.items.length : 0);
    }, 0);

    const stats = [
      { label: "프로젝트", value: `${projectData.length}개` },
      { label: "기술 태그", value: `${totalSkillTags}개` },
      { label: "연락 채널", value: `${contactData.length}개` }
    ];

    root.replaceChildren();

    stats.forEach(function appendStat(stat) {
      const wrapper = document.createElement("div");
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");

      dt.textContent = stat.label;
      dd.textContent = stat.value;
      wrapper.append(dt, dd);
      root.appendChild(wrapper);
    });
  }

  function renderSkills(skillData, root) {
    root.replaceChildren();

    if (!skillData.length) {
      root.appendChild(createEmptyState("기술 스택은 content.js의 skills 배열에서 관리합니다."));
      return;
    }

    skillData.forEach(function appendSkillGroup(group) {
      const article = document.createElement("article");
      const title = document.createElement("h3");
      const tagList = document.createElement("div");
      const items = Array.isArray(group.items) ? group.items : [];

      article.className = "skill-group reveal";
      title.textContent = group.category || "Category";
      tagList.className = "skill-tags";

      items.forEach(function appendItem(item) {
        const tag = document.createElement("span");
        tag.className = "skill-tag";
        tag.textContent = item;
        tagList.appendChild(tag);
      });

      if (!items.length) {
        tagList.appendChild(createEmptyState("기술 항목을 추가하면 이 영역에 자동으로 표시됩니다."));
      }

      article.append(title, tagList);
      root.appendChild(article);
    });
  }

  function renderProjects(projectData, root) {
    root.replaceChildren();

    if (!projectData.length) {
      root.appendChild(createEmptyState("프로젝트 데이터는 content.js의 projects 배열에서 수정할 수 있습니다."));
      return;
    }

    projectData.forEach(function appendProject(project) {
      const article = document.createElement("article");
      const title = document.createElement("h3");
      const summary = document.createElement("p");
      const role = document.createElement("p");
      const outcome = document.createElement("p");
      const techList = document.createElement("ul");
      const links = document.createElement("div");
      const techItems = Array.isArray(project.tech) ? project.tech : [];
      const linkItems = [
        { label: "GitHub", url: project.githubUrl },
        { label: "Demo", url: project.demoUrl }
      ].filter(function onlyValid(item) {
        return Boolean(item.url);
      });

      article.className = "project-card reveal";
      title.textContent = project.title || "프로젝트 제목";
      summary.className = "project-summary";
      summary.textContent = project.summary || "프로젝트 한 줄 설명을 입력하세요.";

      role.className = "project-meta";
      role.append(createLabel("역할"), document.createTextNode(` ${project.role || "역할을 입력하세요."}`));

      outcome.className = "project-meta";
      outcome.append(
        createLabel("결과"),
        document.createTextNode(` ${project.outcome || "결과 또는 성과를 입력하세요."}`)
      );

      techList.className = "project-tech";
      techItems.forEach(function appendTech(item) {
        const tag = document.createElement("li");
        tag.textContent = item;
        techList.appendChild(tag);
      });

      if (!techItems.length) {
        techList.appendChild(createEmptyListItem("기술 태그를 추가하면 이 영역에 표시됩니다."));
      }

      links.className = "project-links";

      if (linkItems.length) {
        linkItems.forEach(function appendLink(item) {
          const link = document.createElement("a");
          link.className = "project-link";
          link.href = item.url;
          link.target = "_blank";
          link.rel = "noreferrer";
          link.textContent = item.label;
          links.appendChild(link);
        });
      } else {
        const empty = document.createElement("p");
        empty.className = "project-links--empty";
        empty.textContent = "외부 링크는 준비되는 대로 추가할 수 있습니다.";
        links.appendChild(empty);
      }

      article.append(title, summary, role, outcome, techList, links);
      root.appendChild(article);
    });
  }

  function renderContacts(contactData, root) {
    root.replaceChildren();

    if (!contactData.length) {
      root.appendChild(createEmptyState("연락처 정보는 content.js의 contacts 배열에서 수정합니다."));
      return;
    }

    contactData.forEach(function appendContact(contact) {
      const card = contact.url ? document.createElement("a") : document.createElement("article");
      const title = document.createElement("h3");
      const meta = document.createElement("p");
      const copy = document.createElement("p");
      const url = contact.url || "";

      card.className = "contact-card reveal";

      if (card.tagName === "A") {
        card.href = url;

        if (isExternalUrl(url)) {
          card.target = "_blank";
          card.rel = "noreferrer";
        }
      }

      title.textContent = contact.label || "Contact";
      meta.className = "contact-card__meta";
      meta.textContent = readableUrl(url);
      copy.className = "contact-copy";
      copy.textContent = `${contact.label || "연락처"} 채널로 연결됩니다.`;
      card.append(title, meta, copy);
      root.appendChild(card);
    });
  }

  function activateSectionNav() {
    const sections = document.querySelectorAll(".observed-section");
    const navLinks = document.querySelectorAll(".nav-link");
    const linkById = new Map();

    navLinks.forEach(function mapLink(link) {
      const target = link.getAttribute("href");
      if (target) {
        linkById.set(target.slice(1), link);
      }
    });

    const observer = new IntersectionObserver(
      function onIntersect(entries) {
        entries.forEach(function processEntry(entry) {
          const link = linkById.get(entry.target.id);
          if (!link) {
            return;
          }

          if (entry.isIntersecting) {
            navLinks.forEach(function clearState(navLink) {
              navLink.classList.remove("active");
            });
            link.classList.add("active");
          }
        });
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: 0.15
      }
    );

    sections.forEach(function observe(section) {
      observer.observe(section);
    });
  }

  function revealOnScroll() {
    const revealItems = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach(function show(item) {
        item.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function onReveal(entries) {
        entries.forEach(function toggle(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.15
      }
    );

    revealItems.forEach(function observe(item) {
      observer.observe(item);
    });
  }

  function createEmptyState(message) {
    const element = document.createElement("p");
    element.className = "empty-state";
    element.textContent = message;
    return element;
  }

  function createEmptyListItem(message) {
    const element = document.createElement("li");
    element.className = "empty-state empty-state--inline";
    element.textContent = message;
    return element;
  }

  function createLabel(text) {
    const strong = document.createElement("strong");
    strong.textContent = text;
    return strong;
  }

  function readableUrl(url) {
    if (!url) {
      return "링크를 추가하세요.";
    }

    if (url.startsWith("mailto:")) {
      return url.replace("mailto:", "");
    }

    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }

  function isExternalUrl(url) {
    return /^https?:\/\//.test(url);
  }
})();
