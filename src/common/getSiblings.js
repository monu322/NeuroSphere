const getSiblings = (e) => {
  let siblings = [];

  if (!e.parentNode) return siblings;

  let sibling = e.parentNode.firstChild;

  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) siblings.push(sibling);

    sibling = sibling.nextSibling;
  }

  return siblings;
};

export default getSiblings;
