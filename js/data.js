/* ═══════════════════════════════════════
   DATA — Timeline & Chat Q&A
═══════════════════════════════════════ */

const timelineData = [
  {
    icon: "Notification", title: "Election Announcement",
    summary: "ECI officially announces the election schedule. MCC begins immediately.",
    detail: "The Election Commission of India (ECI) issues the official election notification in the Gazette of India. This triggers the entire election machinery — the Schedule of Elections is released, listing phase-wise polling dates for all 543 Lok Sabha constituencies. The Model Code of Conduct comes into force the moment this announcement is made.",
    why: "The announcement is the starting gun for the entire democratic process. It ensures all stakeholders — voters, candidates, parties, and government officials — have advance notice and can prepare. The simultaneous start of MCC prevents the ruling party from using its incumbency advantage.",
    example: "In the 2024 Lok Sabha elections, the ECI announced a 7-phase election schedule on March 16, 2024, with polling from April 19 to June 1, 2024. The MCC came into force at 3:30 PM on that very day.",
    violated: "If the government announces major schemes or makes transfers of key officials after the MCC starts, the ECI can issue notices, censure the party, or direct rollback of the announcements. In 2019, the ECI censured Uttar Pradesh CM Yogi Adityanath for a violating MCC speech.",
    simple: "Think of it like a cricket match announcement — once the date is set, the umpires (ECI) are in charge. No one can bend the rules anymore!"
  },
  {
    icon: "Rules", title: "Model Code of Conduct (MCC)",
    summary: "All parties and governments must follow ECI rules until results are declared.",
    detail: "The MCC is a set of guidelines issued by ECI that governs the conduct of political parties, candidates, and governments during the election period. Key rules: No new government schemes or freebies can be announced. No use of government resources (vehicles, buildings) for campaigning. Ministers cannot use their official position to campaign. No hate speech, personal attacks, or appeals based on religion/caste.",
    why: "The MCC creates a level playing field. Without it, the ruling party could use taxpayer-funded resources to win elections unfairly. It separates government machinery from election machinery, which is the backbone of free and fair elections in India.",
    example: "During the 2019 elections, ECI put 6 leaders on notice including a serving CM for MCC violations. In 2024, the EC removed a DGP and issued show-cause notices over violation of the MCC's neutrality requirements for civil servants.",
    violated: "Violations can result in: written warnings, public censure notices, FIRs, removal of officials from election duty, or directing the government to withdraw announcements. The MCC is not a law — it is enforceable through the moral authority of ECI and threat of adverse publicity.",
    simple: "Imagine a cricket match where one team is also the referee. MCC is like saying: during the match, everyone must follow the neutral umpire's rules. No cheating allowed!"
  },
  {
    icon: "Voters", title: "Voter List Finalization",
    summary: "The electoral roll is frozen — no new names can be added after this date.",
    detail: "The electoral roll (voter list) is the official list of eligible voters in each constituency. It is prepared and maintained by the Electoral Registration Officers under the ECI. When the election notification is issued, the roll is frozen. After this date, no additions, deletions or corrections are possible for the current election. Voters can check their status at voterportal.eci.gov.in using their EPIC number, mobile number, or name + address.",
    why: "Freezing the voter list prevents last-minute fake voter registrations or ghost voters being added to influence results. It also ensures administrative preparedness — the total number of voters per booth is finalized for deployment of polling officers and EVMs.",
    example: "For the 2024 general elections, the final electoral roll had 96.88 crore registered voters — the largest electorate in the world. The rolls were frozen in March 2024. Over 1.82 crore new voters aged 18–19 were added in the January 2024 revision.",
    violated: "Adding names after the freeze is a criminal offence under the Representation of the People Act, 1950. Officials who tamper with electoral rolls can face imprisonment and fines. ECI conducts surprise audits to detect fake registrations.",
    simple: "Like a guest list for a big event — once the list is printed and the event date is set, you can't add more names. Only people on the list can come in!"
  },
  {
    icon: "Form", title: "Filing of Nominations",
    summary: "Candidates file nomination papers with the Returning Officer.",
    detail: "Any citizen wishing to contest must file a nomination form before the Returning Officer (RO) of their constituency. The form must include: full name, address, age proof, affidavit of assets/liabilities, criminal records (if any), and educational qualifications. Security deposit: ₹25,000 for general candidates; ₹12,500 for SC/ST candidates. Candidates must be at least 25 years old for Lok Sabha and must be a registered voter in India.",
    why: "The nomination process ensures transparency — all declared assets, liabilities, and criminal cases of candidates are made public. This allows voters to make informed decisions. The security deposit prevents frivolous candidates from clogging the ballot.",
    example: "In the 2024 elections, over 8,300 candidates filed nominations across 543 constituencies. Notably, all declared criminal antecedents must be published in newspapers 3 times — this led to widespread public awareness campaigns about candidate backgrounds.",
    violated: "Nomination papers with false declarations are grounds for rejection by the RO. Filing a false affidavit (e.g., hiding criminal cases or undervaluing assets) is an offence under Section 125A of the Representation of the People Act — punishable with up to 6 months imprisonment.",
    simple: "It's like applying for a school competition. You fill a form, pay a small fee, and share your background. The school (ECI) checks if you qualify."
  },
  {
    icon: "Check", title: "Scrutiny of Nominations",
    summary: "The Returning Officer checks all nominations for legal validity.",
    detail: "After the filing deadline, the Returning Officer scrutinizes each nomination paper in the presence of the candidate or their representative. The RO checks: age proof validity, voter registration status, correct form filling, security deposit payment, required number of proposers (1 proposer for general seats, 10 for union territory seats), and disqualification conditions (e.g., government employment, criminal convictions).",
    why: "Scrutiny acts as a quality gate — it filters out ineligible candidates before they appear on the ballot. Without scrutiny, EVMs would be cluttered with invalid candidates, confusing voters and wasting administrative resources.",
    example: "In past elections, candidates have been rejected for: being a government employee (disqualifies from contesting), not being a registered voter anywhere in India, submitting an incomplete affidavit, or having an outstanding government loan (e.g., from cooperative banks in some states).",
    violated: "If the RO wrongly rejects a valid nomination, the candidate can appeal to the High Court through an Election Petition. Wrongful scrutiny decisions have been overturned by courts, leading to re-election orders in some constituency-level cases.",
    simple: "Like a teacher checking homework before class — the teacher makes sure everything is filled correctly and complete before letting you submit."
  },
  {
    icon: "Exit", title: "Withdrawal of Candidature",
    summary: "Candidates may withdraw by the deadline. Final list is then published on the EVM.",
    detail: "After scrutiny, candidates who have had their nominations accepted are given a window to withdraw from the contest. Withdrawal must be done in person or through an authorized agent before the Returning Officer. Once the withdrawal deadline passes, the final list of contesting candidates is published. This list is the one that appears on Electronic Voting Machines. Candidates cannot withdraw after this deadline.",
    why: "The withdrawal window allows political parties to consolidate votes — allies may ask candidates to withdraw to avoid splitting the vote. It reduces the number of contestants on the EVM, making it cleaner for voters. Fewer candidates also reduces the chance of vote splitting benefitting unintended winners.",
    example: "In the 2024 elections, the INDIA alliance negotiated seat-sharing arrangements where Congress candidates withdrew in constituencies where AAP or SP had a stronger chance. This strategic withdrawal helped maximize opposition votes against the NDA.",
    violated: "Once the withdrawal deadline passes, candidates cannot pull out under any circumstances. If a candidate who has not withdrawn fails to campaign or contest, their name still appears on the EVM. Voters may still vote for them even if the candidate is absent.",
    simple: "Like a sports team saying 'we're dropping out' before a tournament begins. Once the tournament starts, you can't quit — you're in it!"
  },
  {
    icon: "Campaign", title: "Election Campaign",
    summary: "Candidates campaign across constituencies within ECI's strict rules.",
    detail: "The campaign period runs from the announcement of the final candidate list until 48 hours before polling. Candidates and parties can hold rallies, door-to-door campaigns, public meetings, and run advertisements. Spending limit: ₹95 lakh per candidate in large states; ₹75 lakh in smaller states/UTs. All expenses must be recorded in an account submitted to the RO. ECI deploys Flying Squads and Static Surveillance Teams to check for cash/liquor distribution.",
    why: "Regulated campaigns ensure that the rich cannot simply buy elections. Spending limits, paid news monitoring, and surveillance prevent electoral malpractice. Free and fair campaigning is essential for voters to hear all candidates' platforms before deciding.",
    example: "In the 2024 elections, ECI seized over ₹4,600 crore worth of cash, liquor, drugs, and freebies during the campaign period — the highest ever in any election. The MCC Observer system deployed over 2,000 observers across constituencies.",
    violated: "Exceeding the spending limit leads to disqualification of the elected candidate. Distribution of cash/liquor is a cognizable offence. Paid news (disguised as editorial content) leads to addition to the candidate's election expenses account. Hate speech violations can bar a candidate from campaigning.",
    simple: "Like a school debate competition with rules: you get a time limit, equal turns, and you can't bribe the judges. The 'prize money' (votes) must be won fairly!"
  },
  {
    icon: "Quiet", title: "Silence Period",
    summary: "All campaigning stops 48 hours before polling. No social media posts allowed.",
    detail: "The 'Silence Period' begins exactly 48 hours before the scheduled closing time of polling in a constituency. During this period: No election rallies, public meetings, or speeches. No canvassing near polling booths. No advertisements in newspapers, TV, or on social media. No exit polls can be published until the last phase of voting ends. Polling agents can still be inside booths, but active campaigning is completely forbidden.",
    why: "The silence period gives voters quiet time to reflect without being bombarded by campaign noise. It prevents last-minute misinformation that cannot be rebutted. The restriction on exit polls prevents results of earlier phases from influencing voters in later phases.",
    example: "During the 2024 elections, ECI monitored social media platforms 24/7 during silence periods. Multiple complaints were filed against parties for posting campaign content on X (formerly Twitter) during the silence period. ECI directed platforms to remove such content immediately.",
    violated: "Violation of the silence period is an offence under Section 126 of the Representation of the People Act — punishable with up to 2 years imprisonment or a fine or both. Publishing exit polls during the silence period is punishable with up to 2 years imprisonment under Section 126A.",
    simple: "Like the night before a big exam — everyone stops talking about it, switches off notifications, and just rests their mind before the big day!"
  },
  {
    icon: "Vote", title: "Polling Day",
    summary: "Voters cast votes 7 AM–6 PM. EVM records the vote. VVPAT confirms it.",
    detail: "On polling day, voters visit their assigned polling booth and present their EPIC card or any 1 of 12 approved alternative IDs. The presiding officer marks the register, applies indelible ink to the left index finger, and issues a voter slip. The voter enters the voting compartment and presses the button beside their chosen candidate on the EVM. The EVM beeps once and a green light confirms the vote. The VVPAT machine shows a paper slip of the candidate's name and symbol for 7 seconds through a glass window, then drops it into a sealed box. Postal ballots allow armed forces, senior citizens (85+), and persons with disabilities to vote from home.",
    why: "The EVM-VVPAT system ensures accuracy and auditability. Indelible ink prevents double voting. The 7-second VVPAT display gives the voter personal visual confirmation. The entire process is designed to be tamper-proof, accessible, and transparent.",
    example: "In the 2024 elections, 64.2 crore voters (66.3% turnout) cast their votes across 1.05 million polling stations. Polling booths were set up in the Himalayas at 15,000 feet altitude and in the Sundarbans mangroves — ensuring no voter is left out.",
    violated: "Booth capturing (forcibly taking over a polling station) is a serious criminal offence — the election in that constituency can be countermanded (cancelled and repooled). Impersonating a voter, removing ink before voting again, or pressuring voters are all cognizable offences under the Indian Penal Code.",
    simple: "Like pressing a button to choose your school's Head Boy/Girl — everyone gets exactly one press, the machine records it, and a paper confirms your choice. Simple, secret, and final!"
  },
  {
    icon: "Results", title: "Vote Counting and Result",
    summary: "Counting at designated centres. Highest vote-getter in each of 543 seats wins.",
    detail: "Counting begins on the date announced by ECI, typically a few weeks after the last polling phase. It takes place at designated counting centres under strict security. EVM results units are brought from sealed strong rooms and opened in sequence. Votes are counted round by round (one round = one EVM). Candidates and their counting agents supervise the process. The candidate with the highest number of valid votes in a constituency wins — India uses the First Past the Post (FPTP) system, not proportional representation. After all 543 results are declared, the party or coalition with majority (272+ seats) is invited to form the government.",
    why: "Transparent counting with candidate agents present ensures no tampering. The FPTP system means voters in every constituency have a direct representative. The 272-seat majority threshold ensures stable governance. ECI's real-time results portal allows citizens to track seat-by-seat results as they are declared.",
    example: "In the 2024 elections, counting began on June 4, 2024. Results were declared for all 543 seats by end of day. The NDA (led by BJP) won 293 seats, securing a majority. Narendra Modi was sworn in as Prime Minister for a third term on June 9, 2024.",
    violated: "If counting irregularities are suspected, candidates can demand a recount before the Returning Officer. If manipulation is proven, an Election Petition can be filed in the High Court within 45 days of the result. In extreme cases, a court can order a re-election or declare the winner's election void.",
    simple: "Like counting scores in a game — whoever gets the most points in your area wins that area. Add up all 543 area winners and whoever has the most wins the championship (forms government)!"
  }
];

const chatQA = [
  {
    key: "register",
    icon: "Registration",
    q: "How do I register to vote?",
    answer: `<strong>Voter Registration — Step by Step</strong><br><br>
1. Visit <a href="https://voterportal.eci.gov.in" target="_blank" rel="noopener">voterportal.eci.gov.in</a> or download the <strong>Voter Helpline App</strong>.<br>
2. Click <strong>"New Voter Registration"</strong> and fill <strong>Form 6</strong>.<br>
3. Upload: a photo, proof of age (birth certificate / Aadhaar), and address proof.<br>
4. Submit — you'll receive an <strong>acknowledgment number</strong>.<br>
5. Your local <strong>BLO (Booth Level Officer)</strong> will verify your address.<br>
6. Your name appears on the electoral roll within 30 days.<br><br>
📌 <em>Registration closes 7 days before the election notification date.</em><br>
📞 Voter Helpline: <strong>1950</strong>`
  },
  {
    key: "nota",
    icon: "NOTA",
    q: "What is NOTA?",
    answer: `<strong>NOTA — None of the Above</strong><br><br>
NOTA is the <strong>last button on every EVM</strong>, introduced by a Supreme Court order in 2013 (PUCL vs. Union of India).<br><br>
<strong>What it means:</strong> You reject ALL candidates in your constituency.<br>
<strong>Button code:</strong> 99AA on the EVM<br>
<strong>Symbol:</strong> A ballot paper with a cross (designed by ECI)<br><br>
⚠️ <strong>Important limitation:</strong> Even if NOTA receives the <em>most votes</em>, the candidate with the <em>next highest votes</em> still wins. NOTA records dissatisfaction but cannot cancel an election or force a re-election.<br><br>
📌 NOTA votes are counted and published in official results, serving as a measure of public protest.`
  },
  {
    key: "mcc",
    icon: "Rules",
    q: "When does MCC start?",
    answer: `<strong>Model Code of Conduct (MCC)</strong><br><br>
The MCC comes into force <strong>immediately</strong> when the Election Commission announces the election schedule — not when polling begins.<br><br>
<strong>What MCC prohibits:</strong><br>
• No new government schemes or freebies<br>
• No use of government vehicles/buildings for campaigning<br>
• No transfers of key officials without ECI permission<br>
• No hate speech or appeals based on religion/caste<br>
• No paid news (disguised as editorial content)<br><br>
<strong>Duration:</strong> MCC stays active until the <strong>results are declared</strong> — which can be weeks after the last polling phase.<br><br>
📌 The MCC is not a law — it is enforced through ECI's moral authority and the threat of public censure.`
  },
  {
    key: "evm",
    icon: "EVM",
    q: "What is EVM and VVPAT?",
    answer: `<strong>EVM — Electronic Voting Machine</strong><br><br>
India has used EVMs in all general elections since <strong>1999</strong>. An EVM has two units:<br>
• <strong>Ballot Unit</strong> — what the voter sees (buttons with candidate names/symbols)<br>
• <strong>Control Unit</strong> — operated by the Presiding Officer to enable voting<br><br>
The EVM is a <strong>standalone device</strong> — not connected to the internet or any network.<br><br>
<strong>VVPAT — Voter Verifiable Paper Audit Trail</strong><br>
Introduced in 2013. After you press a button on the EVM, the VVPAT shows a <strong>paper slip</strong> with your candidate's name and symbol for <strong>7 seconds</strong> through a glass window. The slip automatically drops into a sealed box — it is for <strong>your visual confirmation only</strong> and cannot be touched by the voter.`,
    image: "pngs/chunaav_02.jfif",
    imageAlt: "Electronic Voting Machine (EVM)"
  },
  {
    key: "documents",
    icon: "ID",
    q: "What documents do I need to vote?",
    answer: `<strong>Documents Accepted at the Polling Booth</strong><br><br>
Your primary ID is the <strong>EPIC Card</strong> (Elector's Photo Identity Card) issued by ECI.<br><br>
<strong>Lost your EPIC card?</strong> You can still vote with any <strong>ONE</strong> of these 12 ECI-approved documents:<br><br>
1. Aadhaar Card &nbsp;2. PAN Card &nbsp;3. Passport &nbsp;4. Driving Licence<br>
5. MNREGA Job Card &nbsp;6. Bank/Post Office Passbook with photo<br>
7. Health Insurance Smart Card (RSBY)<br>
8. Pension document with photograph<br>
9. NPR Smart Card (issued by RGI)<br>
10. Service Identity Card (Central/State Govt employees)<br>
11. Official photo ID issued by PSU<br>
12. Smart Card issued by RGI under NPR<br><br>
📌 Your <strong>voter slip</strong> (delivered before election day) is NOT mandatory — your name on the electoral roll is sufficient.`,
    image: "pngs/chunaav_01.jfif",
    imageAlt: "Ink mark on voter's finger — proof of voting"
  },
  {
    key: "steps",
    icon: "Guide",
    q: "Show me how to vote",
    smart: "section-steps"
  },
  {
    key: "eligibility",
    icon: "Verify",
    q: "Check my eligibility",
    smart: "section-eligibility"
  }
];

const voterJourney = [
  {
    title: "Step 1: Check Eligibility",
    desc: "To vote in India, you must be an Indian citizen and at least 18 years old on the qualifying date. You cannot vote if you are not a citizen or if disqualified by law.",
    info: "Fact: Article 326 of the Constitution grants universal adult suffrage to all citizens.",
    icon: "Verify"
  },
  {
    title: "Step 2: Register as Voter",
    desc: "Visit voterportal.eci.gov.in or use the Voter Helpline App. Fill Form 6 online to register. Registration closes 7 days before the election notification date.",
    info: "Tip: You can pre-register 3 months before turning 18.",
    icon: "Form"
  },
  {
    title: "Step 3: Check Voter List",
    desc: "Your name MUST be on the electoral roll. Search by your EPIC number or details on the ECI portal. Having just an ID card isn't enough; your name must be on the list.",
    info: "Fact: India has over 96.8 crore registered voters.",
    icon: "List"
  },
  {
    title: "Step 4: Find Polling Booth",
    desc: "Find your assigned booth using the ECI portal or Voter Helpline App. It's usually within 2 km of your home. A voter slip will be delivered to your house before polling day.",
    info: "Note: You can vote even if you lost the voter slip, as long as your name is on the list.",
    icon: "Location"
  },
  {
    title: "Step 5: Vote using EVM",
    desc: "Show your ID (EPIC, Aadhaar, PAN, etc.) at the booth. An officer will ink your finger. Press the blue button next to your candidate on the EVM. The VVPAT will print a slip confirming your choice.",
    info: "VVPAT: Shows your vote for 7 seconds through a glass window.",
    image: "pngs/chunaav_02.jfif"
  }
];

const candidateJourney = [
  {
    title: "Step 1: Eligibility to Contest",
    desc: "To be a Lok Sabha candidate, you must be a citizen of India, at least 25 years old, and a registered voter in any constituency in India.",
    info: "Disqualification: You cannot contest if you are a government employee or convicted of certain crimes.",
    icon: "Law"
  },
  {
    title: "Step 2: Choose Constituency",
    desc: "India has 543 Lok Sabha constituencies. Some seats are reserved for SC (Scheduled Castes) or ST (Scheduled Tribes) candidates only.",
    info: "Fact: A candidate can contest from a maximum of two constituencies.",
    icon: "Map"
  },
  {
    title: "Step 3: File Nomination",
    desc: "Submit your nomination papers to the Returning Officer. You must declare your assets, liabilities, and criminal records in an affidavit.",
    info: "Security Deposit: ₹25,000 for General, ₹12,500 for SC/ST.",
    icon: "Folder"
  },
  {
    title: "Step 4: Scrutiny",
    desc: "The Returning Officer checks the validity of all documents. If the paperwork is incomplete or false, the nomination is rejected.",
    info: "Fact: You are allowed to withdraw your nomination before a specific deadline.",
    icon: "Check"
  },
  {
    title: "Step 5: Campaign & MCC",
    desc: "Candidates campaign within strict spending limits (up to ₹95 lakh). The Model Code of Conduct (MCC) ensures fair play and bans hate speech or bribery.",
    info: "Silence Period: All campaigning must stop 48 hours before polling day.",
    icon: "Campaign"
  },
  {
    title: "Step 6: Polling & Results",
    desc: "After voting is complete, EVMs are secured in strong rooms. On counting day, the candidate with the highest number of valid votes in the constituency is declared the winner.",
    info: "System: India uses the First-Past-The-Post voting system.",
    icon: "Results"
  }
];
