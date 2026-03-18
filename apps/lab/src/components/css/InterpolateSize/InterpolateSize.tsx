import "./InterpolateSize.css";

const InterpolateSize = () => {
  return (
    <>
      <a href="https://caniuse.com/?search=interpolate-size" target="_blank">
        🔗 Can I Use ?
      </a>
      <pre>
        <code>{`
:root {
        interpolate-size: allow-keywords;
}

.box {
        height: 2.5rem;
        transition: height 0.4s;
}

.box:hover {
        height: max-content;
} 
`}</code>
      </pre>

      <section>
        <div className="box">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          urna eu tincidunt consectetur, nisi nisl aliquam enim, eget consequat
          sem erat et libero.
        </div>
      </section>
    </>
  );
};

export default InterpolateSize;
