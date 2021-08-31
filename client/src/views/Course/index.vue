<template>
	<div>
		<div class="course-header-area">
			<b-container>
				<b-row>
					<b-col cols="8">
						<div class="course-header-wrap">
							<h1 class="title">{{ course.title }}</h1>
							<p class="subtitle">{{ course.short_description }}</p>
							<div class="rating-row">
								<span class="course-badge best-seller">beginner</span>
								<span class="enrolled-num"> {{ course.studentsCount }} Students enrolled </span>
							</div>
							<div class="created-row">
								<span class="last-updated-date">Last updated {{ course.updatedAt | date }}</span>
								<span class="comment">
									<i class="fas fa-comment" aria-hidden="true"></i>
									<span>&nbsp;arabic</span>
								</span>
							</div>
						</div>
					</b-col>
				</b-row>
			</b-container>
		</div>
		<div class="course-content-area py-5">
			<b-container>
				<b-row>
					<b-col lg="8">
						<div class="course-content pb-4">
							<h4 class="mb-3 font-weight-700">Course content</h4>
							<div class="d-flex align-items-center justify-content-between mb-2">
								<p class="mb-0 font-md">{{ +course.sections.length }} sections • {{ lecturesCount }} lectures • {{ lecturesTime }} total length</p>
								<b-btn size="sm" variant="teal" @click="expandAll">
									<span v-if="allExpanded"> Collapse All </span>
									<span v-else> Expand All </span>
								</b-btn>
							</div>
							<div class="course-content-sections">
								<b-card no-body v-for="(section, i) in course.sections" :key="i">
									<b-card-body @click="section.lecturesVisible = !section.lecturesVisible" class="p-3 d-flex justify-content-between c-pointer">
										<div class="d-flex align-items-center">
											<b-icon :icon="`chevron-${section.lecturesVisible ? 'up' : 'down'}`" />
											<span class="mx-2 font-weight-600">{{ section.title }}</span>
										</div>
										<span class="font-md"> {{ section.lectures.length }} lectures • {{ section.totalTime }} </span>
									</b-card-body>
									<b-collapse v-model="section.lecturesVisible">
										<b-card-footer class="p-0 border-0">
											<div class="d-flex align-items-center justify-content-between p-3 font-md" v-for="(lecture, i) in section.lectures" :key="i">
												<div>
													<span style="font-size: 18px" class="">
														<b-icon
															icon="caret-right-fill"
															variant="white"
															class="rounded-circle bg-dark p-1 c-pointer"
															v-if="lecture.video"
															@click="showLectureVideo(lecture)"
														/>configration
														<b-icon icon="dash-circle" scale="2" variant="white" class="rounded-circle bg-dark p-1" v-else />
													</span>
													<span class="mx-2 text-primary c-pointer" style="text-decoration: underline">{{ lecture.title }}</span>
													<b-icon icon="chevron-down" variant="dark" class="c-pointer" @click="lecture.contentVisible = !lecture.contentVisible" />
													<b-collapse v-model="lecture.contentVisible">
														<p class="text-muted pl-4 mt-1 mb-0 font-md">{{ lecture.content }}</p>
													</b-collapse>
												</div>
												<div>{{ lecture.time }}</div>
											</div>
										</b-card-footer>
									</b-collapse>
								</b-card>
							</div>
						</div>

						<div class="course-requirments py-4">
							<h4 class="mb-3 font-weight-700">Requirements</h4>
							<div class="requirments-content font-md">
								<ul>
									<li v-for="(requirement, i) in course.requirements" :key="i">
										{{ requirement }}
									</li>
								</ul>
							</div>
						</div>
						<div class="course-description py-4">
							<h4 class="mb-3 font-weight-700">Description</h4>
							<div class="description-content font-md" v-html="course.description"></div>
						</div>
					</b-col>
					<b-col lg="4">
						<div class="course-sidebar natural">
							<div class="preview-video-box">
								<img :src="require('@/assets/images/course.jpg')" class="img-fluid w-100" />
							</div>
							<div class="course-sidebar-text-box">
								<div class="buy-btns">
									<router-link to="/login" class="btn btn-enroll">Enroll</router-link>
								</div>
							</div>
						</div>
					</b-col>
				</b-row>
			</b-container>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				allExpanded: false,
				course: {
					title: "The Complete Node.js Developer Course (3rd Edition)",
					short_description: "Learn Node.js by building real-world applications with Node JS, Express, MongoDB, Jest, and more!",
					description: `&lt;input type='text' /&gt;<p>
									Have you tried to learn Node before? You start a new course, 
									and the instructor has you installing a bunch of libraries before you even know what
									Node is or how it works. You eventually get stuck and reach out to the instructor, but you get no reply. 
									You then close the course and never open
									it again.
								</p>
								<p>Sound familiar?</p>
								<p><strong>I created this course to be what I wanted when I was learning Node.</strong></p>
								<p>The Complete Node.js Developer Course covers the fundamentals of Node before diving deep into great tools like Express, Mongoose,
								 and MongoDB.</p>
								<p>
									The entire course is based around a single goal: Turning you into a professional Node developer capable of developing, testing, and deploying
									real-world production applications.
								</p>
								<p><strong>The best way to learn Node is by building Node apps.</strong></p>
								<p>
									From the very start you’ll be programming every project and working through challenges that I’ve designed to reinforce what you’ve learned. This
									will give you the hands-on experience necessary to be able to create and launch your own project once you’re done.
								</p>
								<p>You’ll be building four projects:</p>
								<p>1. A note-taking app to get your feet wet</p>
								<p>2. A weather application that interacts with the MapBox and Dark Sky APIs</p>
								<p>3. A task manager REST API complete with user accounts and authentication</p>
								<p>4. A real-time chat app with a client-side companion</p>
								<p>By the end, you’ll be able to take what you’ve learned and launch your own Node application.</p>
								<p><strong>When learning, learn the latest.</strong></p>
								<p>I work to keep this course full of the most up-to-date Node material out there. This course is compatible with the latest Node.js version.</p>
								<p>You’re getting access to hot-off-the-press features.</p>
								<p><strong>Everything you need comes in one easy-to-use package.</strong></p>
								<p>
									You can stop worrying if you're learning the right skills to build an app or land a new job.
									 I've curated all the tech that's essential to building
									real-world apps. I've mapped out everything in a comprehensive, easy-to-follow package designed to get you up and running in a few weeks.
								</p>
								<p><strong>There’s no better time to learn Node.</strong></p>
								<p>
									According to the 2016 Stack Overflow Survey, Node is in the top ten for back-end popularity and back-end salary, with an average salary of $85k.
									This means more jobs and more opportunities for you.
								</p>
								<p><strong>You might get stuck. But I’m here to help.</strong></p>
								<p>There’s nothing worse than getting five hours into a course, getting stuck, and not getting the help you need to continue.</p>
								<p>I’m in the Q&amp;A everyday to help you get unstuck. I reply to every question to get you back on track.</p>
								<p><strong>Don’t take my word for it. Check the reviews and see what other students are saying.</strong></p>
								<p>
									<em
										>“Any questions people seem to have are answered swiftly, clearly,
										 and often with examples posted on GitHub. Even when the questions asked are
										out of the scope of the course Andrew seems to come up trumps."</em
									>
									- Adam Tait
								</p>
								<p><em>"This is amazing. What's even better is the instructor answered all the questions I asked."</em> - Pak Chu</p>
								<p>
									<em> "The real value in this course is Andrew; he is not just a great teacher, 
									but also he's quick to answer questions and provide feedback." </em>
									- Nick Hester
								</p>
								<p>I guarantee this is the most up-to-date and engaging Node course available, and it comes with a 30-day money-back guarantee.</p>
								<p><strong>During eight chapters you'll learn:</strong></p>
								<p>1. Node.js</p>
								<p>2. Npm</p>
								<p>3. Asynchronous programming</p>
								<p>4. ES6/ES7</p>
								<p>5. MongoDB</p>
								<p>6. Express</p>
								<p>7. Socket.IO</p>
								<p>8. JWT Authentication</p>
								<p>9. Mongoose</p>
								<p>10. File and image uploads</p>
								<p>11. Email sending</p>
								<p>12. Application deployment with Heroku</p>
								<p>13. Version control with Git</p>
								<p>14. GitHub</p>
								<p>15. REST API Design</p>
								<p>16. Code testing</p>
								<p>17. Debugging</p>
								<p>18. Jest</p>
								<p>19. Many more tools</p>
								<p>I can’t wait to see you on the inside!</p>
								<p>- Andrew</p>`,
					category: 0,
					level: 0,
					langMadeIn: 0,
					studentsCount: 5,
					updated_at: Date.now(),
					thumbnail: "course.jpg",
					requirements: [
						"A computer on which you can install software (Windows, MacOS, or Linux)",
						"A basic understanding of JavaScript (variables, functions, objects, arrays, if statements)"
					],
					sections: [
						{
							title: "Introduction",
							lecturesVisible: false,
							totalTime: "50:56",
							lectures: [
								{
									title: "Welcome to the Class!",
									time: "06:58",
									content: "In this section, you'll learn how to get the most out of the class!",
									contentVisible: false
								},
								{
									title: "Grab the PDF Guide",
									time: "01:04",
									content: `Get the most out of the class using it's 125 page PDF guide! This guide contains notes, code examples,
									and documentation links for each lesson.`,
									contentVisible: false
								}
							]
						},
						{
							title: "Installing and Exploring Node.js",
							lecturesVisible: false,
							totalTime: "02:45:05",
							lectures: [
								{
									title: "Section Intro: Installing and Exploring Node.js",
									time: "00:56",
									content: `In this section, you’re going to set
										 up your machine for the rest of the course. This includes installing Node.js and Visual Studio Code.
										 This section also dives into what Node.js is,
										 how Node.js works, and why Node.js is a tool worth learning.`,
									contentVisible: false
								},
								{
									title: "Installing Node.js and Visual Studio Code",
									time: "08:04",
									content: `In this lesson, you’ll install Node.js and Visual Studio Code. Both are free, open source,
									 and available for all operating system.
									 They’re the only tools needed to get started with Node!`,
									contentVisible: false
								},
								{
									title: "What is Node.js?",
									time: "15:31",
									content: `In this lesson, you’ll explore what Node.js is. This includes a brief tour of the V8 JavaScript engine,
									 non-blocking I/O, and more!`,
									contentVisible: false
								},
								{
									title: "Why Should I Use Node.js?",
									time: "17:24",
									content: `Why should you use Node.js? In this lesson, 
									you’ll learn what makes Node.js a tool worth using.`,
									contentVisible: false
								},
								{
									title: "Your First Node.js Script",
									time: "19:24",
									content: `It’s time. In this lesson, 
									you’ll be creating and running your very first Node.js app.`,
									contentVisible: false
								}
							]
						}
					]
				}
			};
		},

		mounted() {
			// console.log(this.lecturesCount);
		},

		computed: {
			lecturesCount() {
				return this.course?.sections?.reduce((total, section) => {
					total += section.lectures.length;
					return total;
				}, 0);
			},
			lecturesTime() {
				let total_hours = 0,
					total_minutes = 0,
					total_seconds = 0;
				this.course?.sections?.forEach((section) => {
					let section_hours = 0,
						section_minutes = 0,
						section_seconds = 0;
					section.lectures.forEach((lecture) => {
						let [h, m, s] = lecture.time.split(":");

						if (typeof s == "undefined") {
							total_minutes += +h;
							total_seconds += +m;
							section_minutes += +h;
							section_seconds += +m;
						} else {
							total_hours += +h;
							total_minutes += +m;
							total_seconds += +s;
							section_hours += +h;
							section_minutes += +m;
							section_seconds = +s;
						}
					});
					if (section_seconds > 59) {
						section_minutes += parseInt(section_seconds / 60);
					}
					if (section_minutes > 59) {
						section_hours += parseInt(section_minutes / 60);
						section_minutes = section_minutes % 60;
					}

					section.totalTime = section_hours ? `${section_hours}h ` : "";
					section.totalTime += section_minutes ? `${section_minutes}min ` : "";
				});

				if (total_seconds > 59) {
					total_minutes += parseInt(total_seconds / 60);
				}
				if (total_minutes > 59) {
					total_hours += parseInt(total_minutes / 60);
					total_minutes = total_minutes % 60;
				}

				let totalTime = total_hours ? `${total_hours}h ` : "";
				totalTime += total_minutes ? `${total_minutes}min ` : "";

				return totalTime;
			}
		},

		watch: {
			allExpanded(v) {
				this.course?.sections?.forEach((section) => {
					section.lecturesVisible = v;
					if (!v) {
						section.lectures.forEach((lecture) => {
							lecture.contentVisible = v;
						});
					}
				});
			}
		},

		methods: {
			expandAll() {
				this.allExpanded = !this.allExpanded;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.course-header-area {
		background-color: #29303b;
		color: #fff;
		padding: 60px 0;
		.course-header-wrap {
			.course-badge {
				color: #29303b;
				box-shadow: 0 0 1px 1px #14171c1a, 0 3px 1px 0 #14171c1a;
				pointer-events: none;
				border-radius: 3px;
				font-size: 9px;
				padding: 1px 8px;
				font-weight: 700;
				position: relative;
				line-height: 1.5;
				text-align: center;
				text-transform: uppercase;
				display: inline-block;
				&:after {
					border-radius: 3px;
					right: -4px;
					background: inherit;
					content: "";
					height: 11px;
					position: absolute;
					top: 2px;
					transform: rotate(45deg);
					width: 11px;
					z-index: 0;
					display: block;
				}
				.title {
					font-size: 36px;
					line-height: 41px;
					font-weight: 600;
					margin-bottom: 10.5px;
				}
				.subtitle {
					font-size: 21px;
					line-height: 27px;
					margin-bottom: 7px;
				}
				&.best-seller {
					background: #f4c150;
				}
			}
			& > div > span {
				margin-right: 12px;
				margin-bottom: 7px;
				font-size: 15px;
			}
		}
	}
	.course-sidebar {
		background-color: #fff;
		box-shadow: 0 0 1px 1px #14171c1a, 0 3px 1px 0 #14171c1a;
		border-radius: 4px;
		color: #505763;
		padding: 3px;
		position: relative;
		margin-top: -300px;
		z-index: 10;
		.course-sidebar-text-box {
			padding: 15px 30px;
			.buy-btns {
				.btn {
					display: block;
					width: 100%;
					margin: 0;
					border-radius: 2px;
					margin-top: 13px;
					padding: 15px 12px;
					font-size: 15px;
					font-weight: 600;
					margin-bottom: 10px;
				}
				.btn-enroll {
					background: transparent;
					border-color: #505763;
					color: #686f7a;
					&:hover,
					&:focus {
						background-color: #f2f3f5;
					}
				}
			}
		}
	}
</style>
