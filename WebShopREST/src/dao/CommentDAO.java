package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import beans.Comment;



public class CommentDAO {
	private  Map<String, Comment> comments = new HashMap<>();
	private String path; //tatjana path
	
	
	public CommentDAO() {
		
	}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	public CommentDAO(String contextPath) {
		loadComments(contextPath);
		path = "C:/Users/User/Desktop/Web Projekat/Web-projekat/WebShopREST/WebContent/comments.txt";
	}
	
	/**
	 * Vra�a korisnika za prosle�eno korisni�ko ime i �ifru. Vra�a null ako korisnik ne postoji
	 * @param username
	 * @param password
	 * @return
	 */
	/*public User find(String username, String password) {
		if (!users.containsKey(username)) {
			return null;
		}
		User user = users.get(username);
		if (!user.getPassword().equals(password)) {
			return null;
		}
		return user;
	}
	
	public Collection findByUsername(String username) {
		if (!users.containsKey(username)) {
			return null;
		}
		User user = users.get(username);
		return user;
	}
	
	public Collection<User> findAll() {
		return users.values();
	}*/
	
	public Collection<Comment> getByFacility(String facilityName){
		Collection<Comment> commentsByObject = new ArrayList<Comment>();
		for(Comment current : comments.values()) {
			if(current.getSportsFacility().equals(facilityName))
				commentsByObject.add(current);
		}
		return commentsByObject;
	}
	
	public Comment save(Comment comment) {
		comments.put(comment.getUser()+comment.getSportsFacility(), comment);
		saveComments();
		return comment;
	}
	
	private void saveComments()  {
		PrintWriter out = null;
		try {
			FileWriter w = new FileWriter(path);
			for(Comment comment : comments.values()) {
				String st = comment.getUser() +";"+comment.getSportsFacility()+";"+comment.getComment()+";"+comment.getMark();
				w.append(st);
				w.append(System.lineSeparator());
			}
			w.flush();
			w.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (out != null) {
				try {
					out.close();
				}
				catch (Exception e) { }
			}
		}
	}
	
	/**
	 * U�itava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #users}.
	 * Klju� je korisni�ko ime korisnika.
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	private void loadComments(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File("C:/Users/User/Desktop/Web Projekat/Web-projekat/WebShopREST/WebContent/comments.txt");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					String user = st.nextToken().trim();
					String facility = st.nextToken().trim();
					String comment = st.nextToken().trim();
					String mark = st.nextToken().trim();
					
					comments.put(user+facility, new Comment(user,facility,comment,Integer.parseInt(mark)));
				}
				
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				}
				catch (Exception e) { }
			}
		}
	}
}