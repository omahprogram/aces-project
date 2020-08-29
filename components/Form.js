import React from 'react'
import PropTypes from 'prop-types'

const Form = ({ errorMessage, onSubmit }) => (
	<form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border">
		<div className="mb-4">
			<label className="block text-gray-900 font-semibold mb-2">
				<span>Username</span>
				<input type="text" name="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
			</label>
		</div>
		<div className="mb-4">
			<label className="block text-gray-900 font-semibold mb-2">
				<span>Password</span>
				<input type="text" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
			</label>
		</div>
		<input type="hidden" name="scope" value="gaia" />
		<input type="hidden" name="client_id" value="gaia" />
		<div className="flex items-center justify-between">
			<button type="submit" className="w-full bg-blue-600 hover:bg-blue-800 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
		</div>

		{errorMessage && <p className="error">{errorMessage}</p>}

	</form>
)

export default Form

Form.propTypes = {
	errorMessage: PropTypes.string,
	onSubmit: PropTypes.func,
}
