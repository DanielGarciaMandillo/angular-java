package com;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class Repository {

	private Connection con;
	private Statement stmt;

	public Repository() {
		try {
			Class.forName("org.h2.Driver");
			con = DriverManager.getConnection("jdbc:h2:./bbdd/bbdd", "bbdd", "");
			stmt = con.createStatement();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

	public void createTable() {
		try {
			stmt.executeUpdate("CREATE TABLE table ( item varchar(50) )");
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

	public void deleteTable() {
		try {
			stmt.executeUpdate("DROP TABLE table");
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

	}

	public void insertItem(Item item) {
		try {

			stmt.executeUpdate("INSERT INTO TABLE ( item ) VALUES ( '" + item.getName() + "' )");
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

	}

	public ArrayList<Item> getDataTable() {
		ArrayList<Item> listResponse = new ArrayList<Item>();
		try {
			ResultSet rs = stmt.executeQuery("SELECT * FROM TABLE");
			getDataResponse(listResponse, rs);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return listResponse;
	}

	private void getDataResponse(ArrayList<Item> listResponse, ResultSet rs) throws SQLException {
		while (rs.next()) {
			String name = rs.getString("item");
			listResponse.add(new Item(name));
		}
	}
}
