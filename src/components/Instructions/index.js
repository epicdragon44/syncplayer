import React from 'react';
import SwipeableViews from 'react-swipeable-views';

const stylesfirst = {
    slide: {
        padding: 15,
        minHeight: "86vh",
        color: '#fff',
    },
    slide1: {
        background: '#fff',
    },
    slide2: {
        background: '#fff',
    },
    text: {
        color: "black",
    }
};
const styles = {
    slide: {
        padding: 15,
        minHeight: "97vh",
        color: '#fff',
    },
    slide1: {
        background: '#fff',
    },
    slide2: {
        background: '#fff',
    },
};
const Instructions = () => (
    <div>
        {/*first section*/}
        <br />
        <SwipeableViews>
            <div style={Object.assign({}, stylesfirst.slide, stylesfirst.slide1)}>
                <div className='colorheader'>
                    <h1 className="guide">Welcome to Information and Guides</h1>
                    <p className="guide"><b>Swipe left</b> for more information about this project and its purpose</p>
                    <p className="guide"><b>Swipe up</b> for mask making guides</p>
                </div>
            </div>
            <div style={Object.assign({}, stylesfirst.slide, stylesfirst.slide2)}>
                <h1 className="guide">Purpose of Masks</h1>
                <p className="guide">According to the CDC, the coronavirus is a respiratory virus that ”is thought to spread mainly through close contact from person-to-person in respiratory droplets from someone who is infected. People who are infected often have symptoms of illness. Some people without symptoms may be able to spread the virus”. The virus is very new, thus the CDC is “still learning about how it spreads and the severity of illness it causes”. It is advised that people remain 6 feet apart at all times in order to practice social distancing guidelines and that “everyone should wear a cloth face cover when they have to go out in public, for example to the grocery store or to pick up other necessities” in addition to constant hand washing and disinfecting.  </p>
                <p className="guide">Read more about it from <a href="https://www.cdc.gov/coronavirus/2019-nCoV/index.html">www.cdc.gov</a></p>
            </div>
            <div style={Object.assign({}, stylesfirst.slide, stylesfirst.slide2)}>
                <h1 className="guide">Mask Materials</h1>
                <p className="guide">The CDC advises to wear “cloth face coverings in public settings where other social distancing measures are difficult to maintain (e.g., grocery stores and pharmacies)” as long as the fabrics are tightly knit, are breathable, and can fit snugly on the face. In order to achieve this, some materials that can be used are cotton fabric, pieces of elastic (or rubber bands, string, cloth strips, or hair ties) and scissors. Some homemade mask options might need a needle and thread (or bobby pins) and/or a sewing machine.
                </p>
                <p className="guide">Read more about it from <a href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/diy-cloth-face-coverings.html">www.cdc.gov</a></p>
            </div>
            <div style={Object.assign({}, stylesfirst.slide, stylesfirst.slide2)}>
                <h1 className="guide">How to Donate to Hospitals</h1>
                <p className="guide">Companies such as UPS, Microsoft, the American Hospital Association and Kaiser Permanente have come together to build an infrastructure for a project called "Protecting People Everywhere," using the same initials for the much needed personal protective equipment, or PPE. This intatinative, HealthEquip, is a site that connects individuals/organizations to hospitals that need supplies such as masks and gloves. Shipping these items are absolutely free as UPS and hospitals work together to provide supplies that are necessary.</p>
                <p className="guide">Visit <a href="https://www.health-equip.com/ ">www.health-equip.com</a> to learn more on this project and start donating.</p>
            </div>
        </SwipeableViews>
        {/*second section*/}
        <hr />
        <SwipeableViews>
            <div style={Object.assign({}, styles.slide, styles.slide1)}>
                <h1 className="guide">Bandana/cloth Face Covering (no sew method)</h1>
                <p className="guide">Materials:</p>
                <ul className="guide">
                    <li className="guide">Bandana (or square cotton cloth approximately 20”x20”)</li>
                    <li className="guide">Rubber bands (or hair ties)</li>
                    <li className="guide">Scissors (if you are cutting your own cloth)</li>
                    <li className="guide">Coffee Filter (optional)</li>
                </ul>
                <img src={require('./mask1/mask1.6.png')} />
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
                <p className="guide">Start by getting your bandana and folding it once into half.  If using a coffee filter, cut out the top of the filter (the curved top area) and cut out an amount to fit a mouth.</p>
                <img src={require('./mask1/mask1.1.png')} />
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
                <p className="guide">Mentally split the piece of fabric into three parts, place the coffee filter into the center (if you chose to do that) and fold the outside two parts so that it forms one long rectangular piece.</p>
                <img src={require('./mask1/mask1.2.png')} />
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
                <p className="guide">Get your two rubber bands on either side and fold left over pieces into the main section of the mask, as shown in the picture.</p>
                <img src={require('./mask1/mask1.3.png')} />
                <img src={require('./mask1/mask1.4.png')} />
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
                <p className="guide">Pull the rubber bands and you have a mask!</p>
                <img src={require('./mask1/mask1.5.png')} />
                <h1 className="guide">Video Demonstration: </h1>
                <iframe width="100%" height="250vh" src="https://www.youtube.com/embed/tPx1yqvJgf4" frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
            </div>
        </SwipeableViews>
        {/*third section*/}
        <hr />
        <SwipeableViews>
            <div style={Object.assign({}, styles.slide, styles.slide1)}>
                <h1 className="guide">Quick Cut T-shirt Face Covering (no sew method)</h1>
                <p>Materials:</p>
                <ul className="guide">
                    <li>T-shirt</li>
                    <li>Scissors</li>
                </ul>
                <img src={require('./mask2/mask2.3.png')} />
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
                <p className="guide">For this mask all that is needed are an old Tshirt and scissors. Cut off the bottom part of the shirt - around 7 to 8 inches worth - and put aside the top part (hint: the top part can be used in making another type of mask!).</p>
                <img src={require('./mask2/mask2.1.png')} />
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
                <p className="guide">Cut out 6-7 inches from one side and take out two rectangles worth of fabric.</p>
                <img src={require('./mask2/mask2.2.png')} />
                <p className="guide">Now you have a mask with two straps!</p>
                <img src={require('./mask2/mask2.3.png')} />
            </div>
        </SwipeableViews>
        {/*fourth section*/}
        <hr />
        <SwipeableViews>
            <div style={Object.assign({}, styles.slide, styles.slide1)}>
                <h1 className="guide">2 Minute Mask (no sew method)</h1>
                <p className="guide">Materials:</p>
                <ul className="guide">
                    <li className="guide">T-shirt</li>
                    <li className="guide">Scissors</li>
                </ul>
                <img src={require('./mask3/mask3.5.png')} />
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
                <p className="guide">Like the second type of DIY mask, all that is needed for this mask is an old Tshirt and scissors. Instead of the top part, cut off the top part of the shirt straight across from where the armpit of the sleeves are. </p>
                <img src={require('./mask3/mask3.1.png')} />
                <img src={require('./mask3/mask3.2.png')} />
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
                <p className="guide">Cut out two semiovals from each side and then get a piece of a paper towel. Put the paper towel in the location where the nose would be (front of the mask). Now tie the straps and you have a face mask!</p>
                <img src={require('./mask3/mask3.3.png')} />
                <img src={require('./mask3/mask3.4.png')} />
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
                <h2 className="guide" style={{textAlign: "center"}}>Video Demonstration: </h2>
                <iframe width="100%" height="250vh" src="https://www.youtube.com/embed/hVEVve-3QeM?start=432" frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                <h2 className="guide" style={{textAlign: "center"}}>Congrats on Finishing! </h2>
                <img src={require('./mask3/mask3.5.png') } />
            </div>
        </SwipeableViews>
        {/*fifth section*/}
        <hr />
        <SwipeableViews>
            <div style={Object.assign({}, styles.slide, styles.slide1)}>
                <h1 className="guide">Sew a Professional Mask</h1>
                <p className="guide">Materials:</p>
                <ul className="guide">
                    <li className="guide">Two 10”x6” rectangles of cotton fabric</li>
                    <li className="guide">Two 6” pieces of elastic (or rubber bands, string, cloth strips, or hair ties)</li>
                    <li className="guide">Needle and thread (or bobby pin)</li>
                    <li className="guide">Scissors</li>
                    <li className="guide">Sewing machine</li>
                </ul>
                <img src={require('./mask4/mask4.4.png')} />
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
                <p className="guide">1. Cut out two 10-by-6-inch rectangles of cotton fabric. Use tightly woven cotton, such as quilting fabric or cotton sheets. T-shirt fabric will work in a pinch. Stack the two rectangles; you will sew the mask as if it was a single piece of fabric.</p>
                <img src={require('./mask4/mask4.1.png')} />
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
                <p className="guide">2. Fold over the long sides ¼ inch and hem. Then fold the double layer of fabric over ½ inch along the short sides and stitch down.</p>
                <img src={require('./mask4/mask4.2.png')} />
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
                <p className="guide">3. Run a 6-inch length of 1/8-inch wide elastic through the wider hem on each side of the mask. These will be the ear loops. Use a large needle or a bobby pin to thread it through. Tie the ends tight.
                    Don’t have elastic? Use hair ties or elastic head bands. If you only have string, you can make the ties longer and tie the mask behind your head.</p>
                <img src={require('./mask4/mask4.3.png')} />
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
                <p className="guide">4. Gently pull on the elastic so that the knots are tucked inside the hem. Gather the sides of the mask on the elastic and adjust so the mask fits your face. Then securely stitch the elastic in place to keep it from slipping.</p>
                <img src={require('./mask4/mask4.4.png')} />
                <h1 className="guide">Video Demonstration: </h1>
                <iframe width="100%" height="250vh" src="https://www.youtube.com/embed/VgHrnS6n4iA" frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
            </div>
        </SwipeableViews>
    </div>
);

export default Instructions;