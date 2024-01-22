//https://github.com/cheatsnake/emojihub

export async function fetchEmoji(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export function displayCards(data, pageDiv, start, end) {
  pageDiv.innerHTML = "";
  let endIndex = end > data.length ? data.length : end;
  for (let i = start; i < endIndex; i++) {
    let card;
    try {
      card = createCard(data[i]);
    } catch (error) {
      card = createErrorCard();
      i = endIndex;
    } finally {
      pageDiv.appendChild(card);
    }
  }
}

export function createErrorCard() {
  let errorCard = document.createElement("div");
  errorCard.className = "emoji-error-card";
  errorCard.innerHTML = "<i>Error!</i>";

  return errorCard;
}

export function createCard(dataObj) {
  let card = document.createElement("div");
  card.className = "emoji-card";
  const emojiDiv = document.createElement("div");
  emojiDiv.className = "emoji";
  const unicodeDiv = document.createElement("div");
  const nameDiv = document.createElement("div");
  const categoryDiv = document.createElement("div");
  const groupDiv = document.createElement("div");

  let unicode = dataObj.unicode[0];
  let emoji = unicode.replace("U+", "&#x");
  emoji += ";";
  let name = dataObj.name;
  let category = dataObj.category;
  let group = dataObj.group;

  if (name.includes("≊")) {
    name = name.slice(0, name.indexOf("≊"));
  }

  emojiDiv.innerHTML = emoji;
  unicodeDiv.innerHTML = "Unicode: " + unicode;
  nameDiv.innerHTML = "Name: " + name;
  categoryDiv.innerHTML = "Category: " + category;
  groupDiv.innerHTML = "Group: " + group;

  card.appendChild(emojiDiv);
  card.appendChild(unicodeDiv);
  card.appendChild(nameDiv);
  card.appendChild(categoryDiv);
  card.appendChild(groupDiv);

  return card;
}

export function paginate(
  emojiPerPage,
  start,
  end,
  currPage,
  totalPages,
  emojiArr,
  pageDiv,
  currPageDiv
) {
  let isPageForward = emojiPerPage > 0;
  start += emojiPerPage;
  end += emojiPerPage;

  if (isPageForward && currPage == totalPages) {
    currPage = 1;
    start = 0;
    end = Math.abs(emojiPerPage);
  } else if (!isPageForward && currPage == 1) {
    start = 0;
    end = Math.abs(emojiPerPage);
  } else {
    currPage = isPageForward ? (currPage += 1) : (currPage -= 1);
  }

  updateCurrentPage(currPage, totalPages, currPageDiv);
  displayCards(emojiArr, pageDiv, start, end);

  return [start, end, currPage];
}

export function updateCurrentPage(currPage, totalPages, currPageDiv) {
  let currPageText = `Page ${currPage} of ${totalPages}`;
  currPageDiv.innerHTML = currPageText;
}
