'use strict';

const ipgeolocation = 'https://api.ipgeolocation.io/ipgeo?apiKey=01b55f5cb22f427094bcc2819b19ffbb';

const timeouts = [];
const mobileAndTabletCheck = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

$(document).ready(() => {
  const links = [
    {
      name: 'Levis Group',
      link: 'https://www.instagram.com/groupoflevis/',
    },
    {
      name: 'Krex - シ',
      link: 'https://www.instagram.com/werzy381/',
    },
    {
      name: 'ʊʍʊȶ',
      link: 'https://www.instagram.com/umutbllbs',
    },
    {
      name: 'Arda',
      link: 'https://www.instagram.com/ardgull/',
    },

  ];

  if (Array.isArray(links) && links.length > 0) {
    links.forEach((link, i) => {
      if (link?.link && link?.name) {
           $('#marquee').append(`<a href="${link.link}" target="_blank" rel="noopener noreferrer">${link.name}</a>${link.name !== 'Arda' ? ' | ' : ''}`);         
        
        if (i < links.length - 1) {
          $('#marquee').append(' <img class="emoticon" src="assets/others/profile.jpg"');
        }
      } else {
        console.warn('Invalid link object:', link);
      }
    });
  } else {
    console.warn('Invalid or empty links array');
  }

  if (mobileAndTabletCheck()) {
    $('#background').replaceWith('<div id="background" style="background-image: url(media/video.mp4);"></div>');

    app.shouldIgnoreVideo = true;
  }

  app.titleChanger(['Wotzshu', 'W0tz$hu', 'W 0 T Z $ H U']);
  app.iconChanger(['assets/icons/roses/profile.jpg']);
});

if ($.cookie('videoTime')) {
  app.videoElement.currentTime = $.cookie('videoTime');
  app.audioElement.currentTime = $.cookie('videoTime');
}

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

document.body.onkeyup = (event) => {
  if (event.keyCode == 32 && app.skippedIntro) {
    if (app.backgroundToggler) {
      app.videoElement.play();
      app.audioElement.play();
    } else {
      app.videoElement.pause();
      app.audioElement.pause();
    }

    return (app.backgroundToggler = !app.backgroundToggler);
  }
};

$('html').on('contextmenu', (event) => {
  const img = document.createElement('img');

  const trollfaceLight = app.skippedIntro ? '' : 'trollface-light';

  img.src = 'assets/others/trollface.jpg';
  img.width = 64;
  img.height = 64;
  img.alt = 'silence';
  img.style = `position: absolute; left: ${event.pageX}px; top: ${event.pageY}px; z-index: 10`;
  img.className = `troll ${trollfaceLight}`;

  document.body.appendChild(img);
});

setInterval(() => {
  $('.troll').remove();
}, 600);

$('.skip').click(() => {
  skipIntro();
});

$.fn.extend({
  animateCss: function (animationName) {
    const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    this.addClass(`animated ${animationName}`).one(animationEnd, () => {
      $(this).removeClass(`animated ${animationName}`);
    });

    return this;
  },
});

const writeLine = (text, speed, timeout, callback) => {
  timeout = typeof timeout === 'number' ? timeout : [0, (callback = timeout)];

  const lineNumber = app.id !== 2 ? ++app.id : (app.id += 2);

  setTimeout(() => {
    const typed = new Typed(`#line${lineNumber}`, {
      strings: text,
      typeSpeed: speed,
      onComplete: callback,
    });
  }, timeout);
};

const usernames = ['user', 'dude', 'nigga', 'unknown'];

const selectedUser = usernames[Math.floor(Math.random() * usernames.length)];

$.getJSON(ipgeolocation, (data) => {
  writeLine(['Authenticating...', `Granting access to <span style='font-size: 14px; color: #06d;'>[unkown]</span>`], 30, () => {
    if (app.skippedIntro) return;
    clearCursor();

    const country = data.country_name || 'your country';

    writeLine([
      `Access granted! <span style='font-size: 14px; color: #0f0;'>[success]</span>`,
      `Welcome back, <i style='color: #0f0'>${selectedUser}</i>! By the way, nice to see someone from ${country} here!`
    ], 30, 500, () => {
      if (app.skippedIntro) return;
      clearCursor();

      writeLine([
        `<i style='color: #F62459'>W 0 T Z $ H U</i>`,
        `<a href="https://www.instagram.com/werzy381/" target="_blank" rel="noopener noreferrer"><i style='color: #7289da'>made by Krex</i></a>`
      ], 120, 500, () => {
        if (app.skippedIntro) return;
        timeouts.push(setTimeout(() => {
          clearCursor();
          skipIntro();
        }, 1500));
      });
    });
  });
});

const skipIntro = () => {
  if (app.skippedIntro) return;

  app.skippedIntro = true;

  timeouts.forEach((timeout) => {
    clearTimeout(timeout);
  });

  $('.top-right').remove();

  $('#main').fadeOut(100, () => {
    $('#main').remove();

    $('#marquee').marquee({
      duration: 15000,
      gap: 420,
      delayBeforeStart: 1000,
      direction: 'left',
      duplicated: true,
    });

    setTimeout(() => {
      $('.brand-header').animateCss(app.effects[Math.floor(Math.random() * app.effects.length)]);
    }, 200);

    setTimeout(() => {
      const typed = new Typed('#brand', {
        strings: app.brandDescription,
        typeSpeed: 40,

        onComplete: () => {
          clearCursor();
        },
      });
    }, 1350);

    setTimeout(() => {
      if (!app.shouldIgnoreVideo) {
        app.videoElement.play();
        app.audioElement.play();
      }

      app.videoElement.addEventListener(
        'timeupdate',
        () => {
          $.cookie('videoTime', app.videoElement.currentTime, { expires: 1 });
        },
        false
      );

      $('.marquee-container').css('visibility', 'visible').hide().fadeIn(100);

      $('.marquee-container').animateCss('zoomIn');

      $('.container').fadeIn();

      $('.background').fadeIn(200, () => {
        if (!app.shouldIgnoreVideo) $('#audio').animate({ volume: app.musicVolume }, app.musicFadeIn);
      });
    }, 200);
  });
};

const clearCursor = () => {
  return $('span').siblings('.typed-cursor').css('opacity', '0');
};
