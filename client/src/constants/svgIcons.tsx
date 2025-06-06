const AppIcon = () => (
	<svg
		className="text-blue-600 w-6 h-6"
		viewBox="0 0 24 24"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		{' '}
		<g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
			{' '}
			<rect id="bound" x={0} y={0} width={24} height={24} />{' '}
			<path
				d="M8,2.5 C7.30964406,2.5 6.75,3.05964406 6.75,3.75 L6.75,20.25 C6.75,20.9403559 7.30964406,21.5 8,21.5 L16,21.5 C16.6903559,21.5 17.25,20.9403559 17.25,20.25 L17.25,3.75 C17.25,3.05964406 16.6903559,2.5 16,2.5 L8,2.5 Z"
				id="Combined-Shape"
				fill="currentColor"
				opacity="0.3"
			/>{' '}
			<path
				d="M8,2.5 C7.30964406,2.5 6.75,3.05964406 6.75,3.75 L6.75,20.25 C6.75,20.9403559 7.30964406,21.5 8,21.5 L16,21.5 C16.6903559,21.5 17.25,20.9403559 17.25,20.25 L17.25,3.75 C17.25,3.05964406 16.6903559,2.5 16,2.5 L8,2.5 Z M8,1 L16,1 C17.5187831,1 18.75,2.23121694 18.75,3.75 L18.75,20.25 C18.75,21.7687831 17.5187831,23 16,23 L8,23 C6.48121694,23 5.25,21.7687831 5.25,20.25 L5.25,3.75 C5.25,2.23121694 6.48121694,1 8,1 Z M9.5,1.75 L14.5,1.75 C14.7761424,1.75 15,1.97385763 15,2.25 L15,3.25 C15,3.52614237 14.7761424,3.75 14.5,3.75 L9.5,3.75 C9.22385763,3.75 9,3.52614237 9,3.25 L9,2.25 C9,1.97385763 9.22385763,1.75 9.5,1.75 Z"
				id="Combined-Shape"
				fill="currentColor"
			/>{' '}
		</g>{' '}
	</svg>
)


const DropdownSvg = () => (
	<svg
		className="h-6 w-6 text-gray-600"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<circle cx={12} cy={12} r={1} />
		<circle cx={19} cy={12} r={1} />
		<circle cx={5} cy={12} r={1} />
	</svg>
)

const ShareSvg = () => (
	<svg
		className="h-4 w-4 me-2.5"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
		<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
	</svg>
)

const RefreshSvg = () => (
	<svg
		className="h-4 w-4 me-2.5"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<polyline points="23 4 23 10 17 10" />
		<polyline points="1 20 1 14 7 14" />
		<path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
	</svg>
)

const DeactivateSvg = () => (
	<svg
		className="h-4 w-4 me-2.5"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<polyline points="3 6 5 6 21 6" />
		<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
		<line x1={10} y1={11} x2={10} y2={17} />
		<line x1={14} y1={11} x2={14} y2={17} />
	</svg>
)

const MailSvg = () => (
	<svg
		className="h-5 w-5"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
		<polyline points="22,6 12,13 2,6" />
	</svg>
)

const TeliphoneSvg = () => (
	<svg
		className="h-5 w-5"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
	</svg>
)

const CheckSvg = () => (
	<svg
		className="text-green-500"
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
		<polyline points="22 4 12 14.01 9 11.01" />
	</svg>
)

const PenSvg = () => (
	<svg
		className="text-sky-500"
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M12 20h9" />
		<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
	</svg>
)

const ViewSvg = () => (
	<svg
		className="h-4 w-4 me-2.5"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
		<circle cx={12} cy={12} r={3} />
	</svg>
)

const EditSvg = () => (
	<svg
		className="h-4 w-4 me-2.5"
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M12 20h9" />
		<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
	</svg>
)

const MenuSvg = () => (
	<svg
		className="h-5 w-5 text-gray-800 inline"
		viewBox="0 0 24 24"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		{/* Generator: Sketch 52.2 (67145) - http://www.bohemiancoding.com/sketch */}
		<title>Stockholm-icons / Text / Bullet-list</title>
		<desc>Created with Sketch.</desc>
		<g
			id="Stockholm-icons-/-Text-/-Bullet-list"
			stroke="none"
			strokeWidth={1}
			fill="none"
			fillRule="evenodd"
		>
			<rect id="bound" x={0} y={0} width={24} height={24} />
			<path
				d="M10.5,5 L19.5,5 C20.3284271,5 21,5.67157288 21,6.5 C21,7.32842712 20.3284271,8 19.5,8 L10.5,8 C9.67157288,8 9,7.32842712 9,6.5 C9,5.67157288 9.67157288,5 10.5,5 Z M10.5,10 L19.5,10 C20.3284271,10 21,10.6715729 21,11.5 C21,12.3284271 20.3284271,13 19.5,13 L10.5,13 C9.67157288,13 9,12.3284271 9,11.5 C9,10.6715729 9.67157288,10 10.5,10 Z M10.5,15 L19.5,15 C20.3284271,15 21,15.6715729 21,16.5 C21,17.3284271 20.3284271,18 19.5,18 L10.5,18 C9.67157288,18 9,17.3284271 9,16.5 C9,15.6715729 9.67157288,15 10.5,15 Z"
				id="Combined-Shape"
				fill="currentColor"
			/>
			<path
				d="M5.5,8 C4.67157288,8 4,7.32842712 4,6.5 C4,5.67157288 4.67157288,5 5.5,5 C6.32842712,5 7,5.67157288 7,6.5 C7,7.32842712 6.32842712,8 5.5,8 Z M5.5,13 C4.67157288,13 4,12.3284271 4,11.5 C4,10.6715729 4.67157288,10 5.5,10 C6.32842712,10 7,10.6715729 7,11.5 C7,12.3284271 6.32842712,13 5.5,13 Z M5.5,18 C4.67157288,18 4,17.3284271 4,16.5 C4,15.6715729 4.67157288,15 5.5,15 C6.32842712,15 7,15.6715729 7,16.5 C7,17.3284271 6.32842712,18 5.5,18 Z"
				id="Combined-Shape"
				fill="currentColor"
				opacity="0.3"
			/>
		</g>
	</svg>
)

const HomeSvg = () => (
	<svg
		width="24px"
		height="24px"
		viewBox="0 0 24 24"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		<title>Stockholm-icons / Layout / Layout-4-blocks</title>
		<desc>Created with Sketch.</desc>
		<g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
			<rect id="bound" x={0} y={0} width={24} height={24} />
			<rect
				id="Rectangle-7"
				fill="currentColor"
				x={4}
				y={4}
				width={7}
				height={7}
				rx="1.5"
			/>
			<path
				d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z"
				id="Combined-Shape"
				fill="currentColor"
				opacity="0.3"
			/>
		</g>
	</svg>
)

const ProjectSvg = () => (
	<svg
		width="24px"
		height="24px"
		viewBox="0 0 24 24"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		<title>Stockholm-icons / Files / Group-folders</title>
		<desc>Created with Sketch.</desc>
		<g
			id="Stockholm-icons-/-Files-/-Group-folders"
			stroke="none"
			strokeWidth={1}
			fill="none"
			fillRule="evenodd"
		>
			{' '}
			<rect id="bound" x={0} y={0} width={24} height={24} />{' '}
			<path
				d="M4.5,21 L21.5,21 C22.3284271,21 23,20.3284271 23,19.5 L23,8.5 C23,7.67157288 22.3284271,7 21.5,7 L11,7 L8.43933983,4.43933983 C8.15803526,4.15803526 7.77650439,4 7.37867966,4 L4.5,4 C3.67157288,4 3,4.67157288 3,5.5 L3,19.5 C3,20.3284271 3.67157288,21 4.5,21 Z"
				id="Combined-Shape"
				fill="currentColor"
				opacity="0.3"
			/>{' '}
			<path
				d="M2.5,19 L19.5,19 C20.3284271,19 21,18.3284271 21,17.5 L21,6.5 C21,5.67157288 20.3284271,5 19.5,5 L9,5 L6.43933983,2.43933983 C6.15803526,2.15803526 5.77650439,2 5.37867966,2 L2.5,2 C1.67157288,2 1,2.67157288 1,3.5 L1,17.5 C1,18.3284271 1.67157288,19 2.5,19 Z"
				id="Combined-Shape-Copy"
				fill="currentColor"
			/>
		</g>
	</svg>
)

const TaskSvg = () => (
	<svg
		width="24px"
		height="24px"
		viewBox="0 0 24 24"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		<title>Stockholm-icons / Text / Article</title>
		<desc>Created with Sketch.</desc>
		<g
			id="Stockholm-icons-/-Text-/-Article"
			stroke="none"
			strokeWidth={1}
			fill="none"
			fillRule="evenodd"
		>
			<rect id="bound" x={0} y={0} width={24} height={24} />
			<rect
				id="Rectangle-20"
				fill="currentColor"
				x={4}
				y={5}
				width={16}
				height={3}
				rx="1.5"
			/>
			<path
				d="M5.5,15 L18.5,15 C19.3284271,15 20,15.6715729 20,16.5 C20,17.3284271 19.3284271,18 18.5,18 L5.5,18 C4.67157288,18 4,17.3284271 4,16.5 C4,15.6715729 4.67157288,15 5.5,15 Z M5.5,10 L12.5,10 C13.3284271,10 14,10.6715729 14,11.5 C14,12.3284271 13.3284271,13 12.5,13 L5.5,13 C4.67157288,13 4,12.3284271 4,11.5 C4,10.6715729 4.67157288,10 5.5,10 Z"
				id="Combined-Shape"
				fill="currentColor"
				opacity="0.3"
			/>
		</g>
	</svg>
)

const ReportSvg = () => (
	<svg
		width="24px"
		height="24px"
		viewBox="0 0 24 24"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		<title>Stockholm-icons / Media / Equalizer</title>
		<desc>Created with Sketch.</desc>
		<g
			id="Stockholm-icons-/-Media-/-Equalizer"
			stroke="none"
			strokeWidth={1}
			fill="none"
			fillRule="evenodd"
		>
			<rect id="bound" x={0} y={0} width={24} height={24} />
			<rect
				id="Rectangle-62-Copy"
				fill="currentColor"
				opacity="0.3"
				x={13}
				y={4}
				width={3}
				height={16}
				rx="1.5"
			/>
			<rect
				id="Rectangle-62-Copy-2"
				fill="currentColor"
				x={8}
				y={9}
				width={3}
				height={11}
				rx="1.5"
			/>
			<rect
				id="Rectangle-62-Copy-4"
				fill="currentColor"
				x={18}
				y={11}
				width={3}
				height={9}
				rx="1.5"
			/>
			<rect
				id="Rectangle-62-Copy-3"
				fill="currentColor"
				x={3}
				y={13}
				width={3}
				height={7}
				rx="1.5"
			/>
		</g>
	</svg>
)

const SettingSvg = () => (
	<svg
		width="24px"
		height="24px"
		viewBox="0 0 24 24"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		<title>Stockholm-icons / Shopping / Settings</title>
		<desc>Created with Sketch.</desc>
		<g
			id="Stockholm-icons-/-Shopping-/-Settings"
			stroke="none"
			strokeWidth={1}
			fill="none"
			fillRule="evenodd"
		>
			<rect
				id="Bound"
				opacity="0.200000003"
				x={0}
				y={0}
				width={24}
				height={24}
			/>
			<path
				d="M4.5,7 L9.5,7 C10.3284271,7 11,7.67157288 11,8.5 C11,9.32842712 10.3284271,10 9.5,10 L4.5,10 C3.67157288,10 3,9.32842712 3,8.5 C3,7.67157288 3.67157288,7 4.5,7 Z M13.5,15 L18.5,15 C19.3284271,15 20,15.6715729 20,16.5 C20,17.3284271 19.3284271,18 18.5,18 L13.5,18 C12.6715729,18 12,17.3284271 12,16.5 C12,15.6715729 12.6715729,15 13.5,15 Z"
				id="Combined-Shape"
				fill="currentColor"
				opacity="0.3"
			/>
			<path
				d="M17,11 C15.3431458,11 14,9.65685425 14,8 C14,6.34314575 15.3431458,5 17,5 C18.6568542,5 20,6.34314575 20,8 C20,9.65685425 18.6568542,11 17,11 Z M6,19 C4.34314575,19 3,17.6568542 3,16 C3,14.3431458 4.34314575,13 6,13 C7.65685425,13 9,14.3431458 9,16 C9,17.6568542 7.65685425,19 6,19 Z"
				id="Combined-Shape"
				fill="currentColor"
			/>
		</g>
	</svg>
)

const NotificationSvg = () => (
	<svg
		width="24px"
		height="24px"
		viewBox="0 0 24 24"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		<title>Stockholm-icons / General / Notification#2</title>
		<desc>Created with Sketch.</desc>
		<g
			id="Stockholm-icons-/-General-/-Notification#2"
			stroke="none"
			strokeWidth={1}
			fill="none"
			fillRule="evenodd"
		>
			<rect id="bound" x={0} y={0} width={24} height={24} />
			<path
				d="M13.2070325,4 C13.0721672,4.47683179 13,4.97998812 13,5.5 C13,8.53756612 15.4624339,11 18.5,11 C19.0200119,11 19.5231682,10.9278328 20,10.7929675 L20,17 C20,18.6568542 18.6568542,20 17,20 L7,20 C5.34314575,20 4,18.6568542 4,17 L4,7 C4,5.34314575 5.34314575,4 7,4 L13.2070325,4 Z"
				id="Combined-Shape"
				fill="currentColor"
			/>
			<circle
				id="Oval"
				fill="currentColor"
				opacity="0.3"
				cx="18.5"
				cy="5.5"
				r="2.5"
			/>
		</g>
	</svg>
)

const AddUserSvg = () => (
	<svg
		className="text-blue-600 w-6 h-6"
		viewBox="0 0 24 24"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		{/* Generator: Sketch 52.2 (67145) - http://www.bohemiancoding.com/sketch */}
		<title>Stockholm-icons / Communication / Add-user</title>
		<desc>Created with Sketch.</desc>
		<g
			id="Stockholm-icons-/-Communication-/-Add-user"
			stroke="none"
			strokeWidth={1}
			fill="none"
			fillRule="evenodd"
		>
			<polygon id="Shape" points="0 0 24 0 24 24 0 24" />
			<path
				d="M18,8 L16,8 C15.4477153,8 15,7.55228475 15,7 C15,6.44771525 15.4477153,6 16,6 L18,6 L18,4 C18,3.44771525 18.4477153,3 19,3 C19.5522847,3 20,3.44771525 20,4 L20,6 L22,6 C22.5522847,6 23,6.44771525 23,7 C23,7.55228475 22.5522847,8 22,8 L20,8 L20,10 C20,10.5522847 19.5522847,11 19,11 C18.4477153,11 18,10.5522847 18,10 L18,8 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z"
				id="Combined-Shape"
				fill="currentColor"
				opacity="0.3"
			/>
			<path
				d="M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z"
				id="Mask-Copy"
				fill="currentColor"
			/>
		</g>
	</svg>
)

const ChatCheckSvg = () => (
	<svg
		width="24px"
		height="24px"
		viewBox="0 0 24 24"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		{/* Generator: Sketch 52.2 (67145) - http://www.bohemiancoding.com/sketch */}
		<title>Stockholm-icons / Communication / Chat-check</title>
		<desc>Created with Sketch.</desc>
		<g
			id="Stockholm-icons-/-Communication-/-Chat-check"
			stroke="none"
			strokeWidth={1}
			fill="none"
			fillRule="evenodd"
		>
			<rect id="bound" x={0} y={0} width={24} height={24} />
			<path
				d="M4.875,20.75 C4.63541667,20.75 4.39583333,20.6541667 4.20416667,20.4625 L2.2875,18.5458333 C1.90416667,18.1625 1.90416667,17.5875 2.2875,17.2041667 C2.67083333,16.8208333 3.29375,16.8208333 3.62916667,17.2041667 L4.875,18.45 L8.0375,15.2875 C8.42083333,14.9041667 8.99583333,14.9041667 9.37916667,15.2875 C9.7625,15.6708333 9.7625,16.2458333 9.37916667,16.6291667 L5.54583333,20.4625 C5.35416667,20.6541667 5.11458333,20.75 4.875,20.75 Z"
				id="check"
				fill="currentColor"
				opacity="0.3"
			/>
			<path
				d="M2,11.8650466 L2,6 C2,4.34314575 3.34314575,3 5,3 L19,3 C20.6568542,3 22,4.34314575 22,6 L22,15 C22,15.0032706 21.9999948,15.0065399 21.9999843,15.009808 L22.0249378,15 L22.0249378,19.5857864 C22.0249378,20.1380712 21.5772226,20.5857864 21.0249378,20.5857864 C20.7597213,20.5857864 20.5053674,20.4804296 20.317831,20.2928932 L18.0249378,18 L12.9835977,18 C12.7263047,14.0909841 9.47412135,11 5.5,11 C4.23590829,11 3.04485894,11.3127315 2,11.8650466 Z M6,7 C5.44771525,7 5,7.44771525 5,8 C5,8.55228475 5.44771525,9 6,9 L15,9 C15.5522847,9 16,8.55228475 16,8 C16,7.44771525 15.5522847,7 15,7 L6,7 Z"
				id="Combined-Shape"
				fill="currentColor"
			/>
		</g>
	</svg>
)

const MailAttechSvg = () => (
	<svg
		width="24px"
		height="24px"
		viewBox="0 0 24 24"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		{/* Generator: Sketch 52.2 (67145) - http://www.bohemiancoding.com/sketch */}
		<title>Stockholm-icons / Communication / Mail-attachment</title>
		<desc>Created with Sketch.</desc>
		<g
			id="Stockholm-icons-/-Communication-/-Mail-attachment"
			stroke="none"
			strokeWidth={1}
			fill="none"
			fillRule="evenodd"
		>
			<rect id="bound" x={0} y={0} width={24} height={24} />
			<path
				d="M14.8571499,13 C14.9499122,12.7223297 15,12.4263059 15,12.1190476 L15,6.88095238 C15,5.28984632 13.6568542,4 12,4 L11.7272727,4 C10.2210416,4 9,5.17258756 9,6.61904762 L10.0909091,6.61904762 C10.0909091,5.75117158 10.823534,5.04761905 11.7272727,5.04761905 L12,5.04761905 C13.0543618,5.04761905 13.9090909,5.86843034 13.9090909,6.88095238 L13.9090909,12.1190476 C13.9090909,12.4383379 13.8240964,12.7385644 13.6746497,13 L10.3253503,13 C10.1759036,12.7385644 10.0909091,12.4383379 10.0909091,12.1190476 L10.0909091,9.5 C10.0909091,9.06606198 10.4572216,8.71428571 10.9090909,8.71428571 C11.3609602,8.71428571 11.7272727,9.06606198 11.7272727,9.5 L11.7272727,11.3333333 L12.8181818,11.3333333 L12.8181818,9.5 C12.8181818,8.48747796 11.9634527,7.66666667 10.9090909,7.66666667 C9.85472911,7.66666667 9,8.48747796 9,9.5 L9,12.1190476 C9,12.4263059 9.0500878,12.7223297 9.14285008,13 L6,13 C5.44771525,13 5,12.5522847 5,12 L5,3 C5,2.44771525 5.44771525,2 6,2 L18,2 C18.5522847,2 19,2.44771525 19,3 L19,12 C19,12.5522847 18.5522847,13 18,13 L14.8571499,13 Z"
				id="Combined-Shape"
				fill="currentColor"
				opacity="0.3"
			/>
			<path
				d="M9,10.3333333 L9,12.1190476 C9,13.7101537 10.3431458,15 12,15 C13.6568542,15 15,13.7101537 15,12.1190476 L15,10.3333333 L20.2072547,6.57253826 C20.4311176,6.4108595 20.7436609,6.46126971 20.9053396,6.68513259 C20.9668779,6.77033951 21,6.87277228 21,6.97787787 L21,17 C21,18.1045695 20.1045695,19 19,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,6.97787787 C3,6.70173549 3.22385763,6.47787787 3.5,6.47787787 C3.60510559,6.47787787 3.70753836,6.51099993 3.79274528,6.57253826 L9,10.3333333 Z M10.0909091,11.1212121 L12,12.5 L13.9090909,11.1212121 L13.9090909,12.1190476 C13.9090909,13.1315697 13.0543618,13.952381 12,13.952381 C10.9456382,13.952381 10.0909091,13.1315697 10.0909091,12.1190476 L10.0909091,11.1212121 Z"
				id="Combined-Shape"
				fill="currentColor"
			/>
		</g>
	</svg>
)

const LikeSvg = () => (
	<svg
		width="24px"
		height="24px"
		viewBox="0 0 24 24"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		{/* Generator: Sketch 52.2 (67145) - http://www.bohemiancoding.com/sketch */}
		<title>Stockholm-icons / General / Like</title>
		<desc>Created with Sketch.</desc>
		<g
			id="Stockholm-icons-/-General-/-Like"
			stroke="none"
			strokeWidth={1}
			fill="none"
			fillRule="evenodd"
		>
			<rect id="bound" x={0} y={0} width={24} height={24} />
			<path
				d="M9,10 L9,19 L10.1525987,19.3841996 C11.3761964,19.7920655 12.6575468,20 13.9473319,20 L17.5405883,20 C18.9706314,20 20.2018758,18.990621 20.4823303,17.5883484 L21.231529,13.8423552 C21.5564648,12.217676 20.5028146,10.6372006 18.8781353,10.3122648 C18.6189212,10.260422 18.353992,10.2430672 18.0902299,10.2606513 L14.5,10.5 L14.8641964,6.49383981 C14.9326895,5.74041495 14.3774427,5.07411874 13.6240179,5.00562558 C13.5827848,5.00187712 13.5414031,5 13.5,5 L13.5,5 C12.5694044,5 11.7070439,5.48826024 11.2282564,6.28623939 L9,10 Z"
				id="Path-42"
				fill="currentColor"
			/>
			<rect
				id="Rectangle-153"
				fill="currentColor"
				opacity="0.3"
				x={2}
				y={9}
				width={5}
				height={11}
				rx={1}
			/>
		</g>
	</svg>
)

const ProfileSvg = () => (
	<svg
		className="h-4 w-4 me-2"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
		<circle cx={12} cy={7} r={4} />
	</svg>
)

const SettingSvg2 = () => (
	<svg
		className="h-4 w-4 me-2"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<circle cx={12} cy={12} r={3} />
		<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
	</svg>
)

const SupportSvg = () => (
	<svg
		className="h-4 w-4 me-2"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<circle cx={12} cy={12} r={10} />
		<line x1="14.31" y1={8} x2="20.05" y2="17.94" />
		<line x1="9.69" y1={8} x2="21.17" y2={8} />
		<line x1="7.38" y1={12} x2="13.12" y2="2.06" />
		<line x1="9.69" y1={16} x2="3.95" y2="6.06" />
		<line x1="14.31" y1={16} x2="2.83" y2={16} />
		<line x1="16.62" y1={12} x2="10.88" y2="21.94" />
	</svg>
)

const SignOutSvg = () => (
	<svg
		className="h-4 w-4 me-2"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
		<path d="M7 11V7a5 5 0 0 1 9.9-1" />
	</svg>
)
export {
	AppIcon,
	DropdownSvg,
	ShareSvg,
	RefreshSvg,
	DeactivateSvg,
	MailSvg,
	TeliphoneSvg,
	CheckSvg,
	PenSvg,
	ViewSvg,
	EditSvg,
	MenuSvg,
	HomeSvg,
	ProjectSvg,
	TaskSvg,
	ReportSvg,
	SettingSvg,
	NotificationSvg,
	AddUserSvg,
	ChatCheckSvg,
	MailAttechSvg,
	LikeSvg,
	ProfileSvg,
	SettingSvg2,
	SupportSvg,
	SignOutSvg,
}
